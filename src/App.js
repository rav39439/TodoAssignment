import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./Pages/Login/Login";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getTask } from "./redux/Actions"; // Fixed import
import Navbar from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { dupTask } from "./redux/Actions";
import { connect } from "react-redux";
import { setUser } from "./redux/Actions";
import Register from "./Pages/Register/Register";
import Tasktable from "./Pages/Tasktable/Tasktable";
import Viewtask from "./components/ViewTask/Viewtask";
const mapStateToProps = (state) => ({
  currentuser: state.UsersReducer, // Ensure these match your actual reducer names
  tasks: state.TaskReducer, // Fixed reducer name
  messages: state.messageReducer, // Fixed reducer name
  duptasks: state.dupReducer, // Fixed reducer name
});

const mapDispatchToProps = (dispatch) => ({
  getTask: () => dispatch(getTask()),
});

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Profile");
    navigate("/");
    dispatch(setUser(null));
  };

  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem("Profile"))));
    let userdata = JSON.parse(localStorage.getItem("Profile"));
    dispatch(getTask(userdata));
    dispatch(dupTask(userdata));
    if (localStorage.getItem("Profile") !== null) {
      let data = JSON.parse(localStorage.getItem("Profile"));
      const token = data?.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          handleLogout();
        }
      }
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar
        tasks={props.tasks.tasks}
        userInfo={props.currentuser}
        duptasks={props.duptasks.duptasks}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            props.currentuser?.user !== null ? (
              <Tasktable
                currentUser={props.currentuser}
                tasks={props.tasks.tasks}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/Login"
          element={<Login currentMessage={props.messages} />}
        />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/viewtask" element={<Viewtask />} />
      </Routes>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { useEffect,useState

 } from "react";
 import {useDispatch} from 'react-redux'
 import Login from "./Pages/Login/Login";

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {  getTask } from "./redux/Actions"; // Fixed import
import Navbar from "./components/Navbar/Navbar";
import Tasks from "./Pages/tasks/Tasks";
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { dupTask } from "./redux/Actions";
import { connect } from "react-redux";
import { setUser } from "./redux/Actions";
import Register from "./Pages/Register/Register";
import Tasktable from "./Pages/Tasktable/Tasktable";
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
  const [isTableView, setIsTableView] = useState(true);

  const dispatch=useDispatch()
   const navigate=useNavigate()
  const handleLogout=()=>{
    // dispatch({type:'LOGOUT'})
    localStorage.removeItem('Profile');

    navigate('/')
    dispatch(setUser(null))
  }

useEffect(()=>{
    dispatch(setUser(JSON.parse(localStorage.getItem('Profile'))))

let userdata=JSON.parse(localStorage.getItem('Profile'))
    dispatch(getTask(userdata))
    dispatch(dupTask(userdata))

    if(localStorage.getItem('Profile')!==null){
      let data=JSON.parse(localStorage.getItem('Profile'))
    const token=data?.token
    if(token){
        const decodedToken=jwtDecode(token)
        // console.log(decodedToken)
        if(decodedToken.exp*1000<new Date().getTime()){
            handleLogout()

        }
    }
  }
},[dispatch])

const handleToggle = () => {
  setIsTableView((prevState) => !prevState);
};
  return (
    <div className="App">
     <Navbar tasks={props.tasks.tasks} userInfo={props.currentuser} duptasks={props.duptasks.duptasks}/>

    {
      props.currentuser?.user!==null?(<div style={{padding:"10px"}}>
        <label  className="switch">
        <input  type="checkbox" checked={isTableView} onChange={handleToggle} />

        <span className="slider"></span>

      </label>
      <span>Table View</span>

        </div>):''
    }
        
       

        <Routes>
          <Route exact path="/" element={props.currentuser?.user!==null? isTableView?<Tasktable currentUser={props.currentuser} tasks={props.tasks.tasks} />:<Tasks currentUser={props.currentuser} tasks={props.tasks.tasks}/>:<Login />} />
          <Route exact path="/Login" element={<Login  currentMessage={props.messages} />} />
          <Route exact path="/Register" element={<Register />} />

        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
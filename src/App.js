import React, { useEffect

 } from "react";
 import {useDispatch} from 'react-redux'
 import Login from "./Pages/Login/Login";

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {  getTask } from "./redux/Actioins"; // Fixed import
import Navbar from "./components/Navbar/Navbar";
import Tasks from "./Pages/tasks/Tasks";
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

import { connect } from "react-redux";
import { setUser } from "./redux/Actioins";
import Register from "./Pages/Register/Register";
const mapStateToProps = (state) => ({
  currentuser: state.UsersReducer, // Ensure these match your actual reducer names
  tasks: state.TaskReducer, // Fixed reducer name
  messages: state.messageReducer, // Fixed reducer name

});

const mapDispatchToProps = (dispatch) => ({
  getTask: () => dispatch(getTask()),
});

function App(props) {
  console.log(props)
  const dispatch=useDispatch()
   const navigate=useNavigate()
  const handleLogout=()=>{
    // dispatch({type:'LOGOUT'})
    navigate('/')
    dispatch(setUser(null))
  }

useEffect(()=>{
    dispatch(setUser(JSON.parse(localStorage.getItem('Profile'))))
let userdata=JSON.parse(localStorage.getItem('Profile'))
    dispatch(getTask(userdata))

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
  return (
    <div className="App">
      {/* <Router> */}
        <Navbar tasks={props.tasks.tasks} userInfo={props.currentuser}/>
        <Routes>
          <Route exact path="/" element={props.currentuser?.user!==null?<Tasks currentUser={props.currentuser} tasks={props.tasks.tasks} />:<Login />} />
          <Route exact path="/Login" element={<Login  currentMessage={props.messages} />} />
          <Route exact path="/Register" element={<Register />} />

        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
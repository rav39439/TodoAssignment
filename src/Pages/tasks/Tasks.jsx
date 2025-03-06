import React from 'react'

import  { useState, useEffect } from "react";
import Acard from '../../components/Acard/Acard';
import {  Typography } from '@mui/material';
import { useSelector } from "react-redux";

const Tasks = (props) => {
  const tasks = props.tasks; // Access tasksReducer state
    const [loading, setloading] = useState(false)
  return (
<div className="container">

  All tasks
            {props.tasks.length > 0 && loading === false ? (
              <div className="" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px', // Adjust gap between grid items as needed
                width: '100%',
              }}>
                {props.tasks.map((task, index) => (
                  <div className="col-md-3" key={index}>
                    <Acard task={task} addtask={props.addtask} currentUser={props.currentUser} />
                  </div>
                ))}
              </div>
            ) : (
              <p>No Tasks</p>
            )}
          </div>

  )
}

export default Tasks
import React from 'react'

import  { useState } from "react";
import Taskcard from '../../components/Taskcard/Taskcard';
import { Typography } from '@mui/material';

import './Task.css'
const Tasks = (props) => {
    const [loading, setloading] = useState(false)
  return (
    <>
<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
  Welcome to Taskmanager
</Typography>
<div className="container mt-4">

            {props.tasks.length > 0 && loading === false ? (

              <div className="task-grid">

                {props.tasks.map((task, index) => (
                  <div className="col-md-3 mt-2" key={index}>
                    <Taskcard task={task} addtask={props.addtask} currentUser={props.currentUser} />
                  </div>
                ))}
              </div>
            ) : (
              <h1>No Tasks</h1>
            )}
          </div>
          </>
  )

}

export default Tasks
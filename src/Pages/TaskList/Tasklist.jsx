import React from 'react'
import './Tasklist.css'
import  { useState } from "react";
import Tasktable from '../../components/Tasktable/Tasktable';
import { Typography } from '@mui/material';


// import './Task.css'
const Tasklist = (props) => {
    const [loading, setloading] = useState(false)
  return (
    <>
<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
  Welcome to Taskmanager
</Typography>
    <div className="container mt-4">

    {props.tasks.length > 0 && loading === false ? (
    <table className="table table-bordered table-striped" style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead className="table-dark">
      <tr>
        <th style={{ padding: "12px", textAlign: "center" }}>Title</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Description</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Progress</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Start Date</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Due Date</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Actual End Date</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Priority</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Category</th>

        <th style={{ padding: "7px", textAlign: "center" }}>Edit</th>
        <th style={{ padding: "7px", textAlign: "center" }}>Delete</th>

      </tr>
    </thead>
    <tbody>
      {props.tasks.map((task, index) => (
        <Tasktable
          key={index}
          task={task}
          addtask={props.addtask}
          currentUser={props.currentUser}
        />
      ))}
    </tbody>
  </table>
    ) : (
      <h1>No Tasks</h1>
    )}
  </div>
  </>

  )
}

export default Tasklist
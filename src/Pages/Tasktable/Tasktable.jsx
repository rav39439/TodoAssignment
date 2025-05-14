import React from 'react'
import './Tasktable.css'
import Taskrow from '../../components/Taskrow/Taskrow';
import { Typography } from '@mui/material';


// import './Task.css'
const Tasktable = (props) => {
  return (
    <>
<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
  Welcome to Taskmanager
</Typography>
    <div className="container mt-4">

    {props.tasks.length > 0  ? (
    <table className="table table-bordered table-striped" style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead className="table-dark">
      <tr>
        <th style={{ padding: "12px", textAlign: "center" }}>Title</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Progress</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Start Date</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Due Date</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Category</th>
        <th style={{ padding: "7px", textAlign: "center" }}>view</th>
        <th style={{ padding: "7px", textAlign: "center" }}>Edit</th>
        <th style={{ padding: "7px", textAlign: "center" }}>Delete</th>

      </tr>
    </thead>
    <tbody>
      {props.tasks.map((task, index) => (
        <Taskrow
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

export default Tasktable
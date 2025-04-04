import React from 'react'
import { useState } from "react";
import { updateTask } from '../../redux/Actions';
import { deleteTask } from '../../redux/Actions';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import {Box, Card, CardContent, Typography, CardActions, Button, LinearProgress,
   Table, TableBody, TableRow, TableCell , Dialog,  Slider,

   DialogActions,
   DialogContent,
   DialogTitle,
   TextField,
   MenuItem,
   Select,
   FormControl,
   IconButton,
  
  } from "@mui/material";
  import { useDispatch } from "react-redux";
  import DeleteIcon from "@mui/icons-material/Delete";



const Taskrow = (props) => {
  const currentDate = new Date();
  const dueDate = new Date(props.task.duedate);
  const isOverdue = dueDate < currentDate;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ taskTitle: props.task.taskTitle,priority:props.task.priority || 'Medium',duedate:props.task.duedate,username:props.task.username,userid:props.task.userid, taskdetails:props.task.taskdetails,taskstartedAt:props.task.taskstartedAt,taskendedAt:props.task.taskendedAt, taskprogress:props.task.taskprogress,taskstatus:props.task.taskstatus,taskCategories:props.task.taskCategories });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (newValue) => {
     setFormData({ ...formData, taskprogress: newValue.target.value });
  };

  const handletimeChange = (newValue) => {
     setFormData({ ...formData, duedate: new Date(newValue.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(formData.taskstatus=='Completed'){
      formData.taskendedAt=new Date().toISOString()
    }
   formData._id=props.task._id
     dispatch(updateTask(formData,props.task._id))
    handleClose();
  };

  const deletetask=(id)=>{
    console.log(id)
    dispatch(deleteTask(id))

  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Ensures AM/PM format
    });
  };
     
  const categories = ["Work", "Personal", "Learning", "Other"]; // Categories for the dropdown
  const priorities = ["Medium", "High", "Low"]; // Categories for the dropdown

  const allstatus = ["Completed","In Progress","Started"]; // Categories for the dropdown

  return (

    <tr>
    {/* Delete Icon & Overdue Label */}
    <td>
    <td>{props.task.taskTitle}</td>

    </td>
  
    {/* Task Title */}
  
    {/* Task Details */}
    <td>{props.task.taskdetails}</td>
  
    {/* Progress Bar */}
    <td>
      <Typography variant="body2">Progress: {props.task.taskprogress}%</Typography>
      <LinearProgress
        variant="determinate"
        value={props.task.taskprogress}
        sx={{ height: 8, borderRadius: 6 }}
      />
    </td>
  
    {/* Dates */}
    <td>
 {formatDate(props.task.taskstartedAt)}<br />
      </td>
<td>
{formatDate(props.task.duedate)}<br />

</td>

<td>
 {props.task.taskendedAt!==null?formatDate(props.task.taskendedAt): 'N/A'}

</td>
  
    {/* Priority */}
    <td>{props.task.priority || "Medium"}</td>
  
    {/* Status */}
    <td>{props.task.taskstatus}</td>
  
    {/* Category */}
    <td>{props.task.taskCategories}</td>
  
    {/* Edit Button and Dialog */}
    <td>
      <FaEdit size={24} onClick={handleOpen} variant="contained"

    style={{ cursor: "pointer", color: "blue", fontSize: "5px" }}

      
      >Edit Task</FaEdit>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <label>Task Title</label>
            <TextField
              name="taskTitle"
              fullWidth
              margin="normal"
              value={formData.taskTitle}
              onChange={handleChange}
              required
            />
  
            <label>Task Details</label>
            <TextField
              name="taskdetails"
              fullWidth
              margin="normal"
              value={formData.taskdetails}
              onChange={handleChange}
              required
            />
  
            <label>Due Date</label>
            <TextField
              type="datetime-local"
              value={formData.duedate ? new Date(formData.duedate).toISOString().slice(0, 16) : ""}
              onChange={handletimeChange}
              fullWidth
            />
  
            <Typography variant="body2" sx={{ mt: 2 }}>
              Progress: {formData.taskprogress}%
            </Typography>
            <Slider
              value={formData.taskprogress}
              onChange={handleSliderChange}
              step={10}
              marks
              min={0}
              max={100}
              sx={{ width: 300 }}
              name="taskprogress"
            />
  
            <FormControl fullWidth margin="normal">
              <label>Status</label>
              <Select
                name="taskstatus"
                value={formData.taskstatus}
                onChange={handleChange}
                required
              >
                {allstatus.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <FormControl fullWidth margin="normal">
              <label>Priority</label>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                {priorities.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <FormControl fullWidth margin="normal">
              <label>Category</label>
              <Select
                name="taskCategories"
                value={formData.taskCategories}
                onChange={handleChange}
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button type="submit" color="primary" variant="contained">Save Changes</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </td>
    <td>
    <FaTrash size={24} style={{color:"red"}}
      onClick={() => deletetask(props.task._id)}
      sx={{
       
        backgroundColor: "red",
        // color: "white",
        // // boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        // "&:hover": {
        //   backgroundColor: "darkred",
        // },
      }}
    >



      <DeleteIcon />
    </FaTrash>
        
    </td>
  </tr>
  )
}

export default Taskrow
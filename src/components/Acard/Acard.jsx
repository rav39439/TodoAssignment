import React from 'react'
import './Acard.css'
import { useState } from "react";
import { updateTask } from '../../redux/Actioins';
import { deleteTask } from '../../redux/Actioins';
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



const Acard = (props) => {
  const currentDate = new Date();
  const dueDate = new Date(props.task.duedate);
  const isOverdue = dueDate < currentDate;
  // console.log(import.meta.globEager('./Acard.css'))

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
    dispatch(deleteTask(props.task._id))

  }
     
  const categories = ["Work", "Personal", "Learning", "Other"]; // Categories for the dropdown
  const priorities = ["Medium", "High", "Low"]; // Categories for the dropdown

  const allstatus = ["Completed","In Progress","Started"]; // Categories for the dropdown

  return (

    <Box sx={{ position: "relative", display: "inline-block" }}>

    <Card sx={{ maxWidth: 400, border: "1pt solid", borderRadius: "0.25rem", padding: "16px" }}>
  {/* Delete Icon Positioned Inside Card */}
  <IconButton
      onClick={() => deletetask(props.task._id)}
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "red",
        color: "white",
        // boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        "&:hover": {
          backgroundColor: "darkred",
        },
      }}
    >



      <DeleteIcon />
    </IconButton>

    {isOverdue && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "bold",
            padding: "4px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          Deadline Reached
        </Box>
      )}
     <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {/* Task Title */}
              <Typography variant="h5" gutterBottom>
                {props.task.taskTitle}
              </Typography>

              {/* Task Details - Takes More Space */}
              <Typography variant="body1" color="text.primary" sx={{ minHeight: 100 }}>
                {props.task.taskdetails}
              </Typography>

              {/* Progress Bar - Reduced Space */}
              <div style={{ marginTop: "8px" }}>
                <Typography variant="body2">Progress: {props.task.taskprogress}%</Typography>
                <LinearProgress variant="determinate" value={props.task.taskprogress} sx={{ height: 8, borderRadius:  6}} />
              </div>

              {/* Table - Less Space */}
              <Table size="small" sx={{ marginTop: 1 }}>
                <TableBody>
                  <TableRow>
                    <TableCell><b>Start Date</b></TableCell>
                    <TableCell>{props.task.taskstartedAt}</TableCell>
                  </TableRow>
                  <TableCell><b>Due Date</b></TableCell>
                    <TableCell>{props.task.duedate}</TableCell>
                  <TableRow>
                    <TableCell><b>End Date</b></TableCell>
                    <TableCell>{props.task.taskendedAt || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>Priority</b></TableCell>
                    <TableCell>{props.task.priority || "Medium"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell>{props.task.taskstatus}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell>{props.task.taskCategories}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>

    {/* Card Actions (Optional) */}
    <CardActions>
        <Button size="small" onClick={handleOpen} variant="contained">
          Edit Task
        </Button>
      </CardActions>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>

          <label>taskTitle</label>

            <TextField
              label="Task Title"
              name="taskTitle"
              fullWidth
              margin="normal"
              value={formData.taskTitle}
              onChange={handleChange}
              required
            />

<label>taskdetails</label>

            <TextField
              name="taskdetails"
              fullWidth
              margin="normal"
              value={formData.taskdetails}
              onChange={handleChange}
              required
            />
              {/* <label>Duration</label> */}

{/* <TextField
              name="taskduration"
              fullWidth
              margin="normal"
              value={formData.taskduration}
              onChange={handleChange}
              required
            /> */}


<label>duedate</label>
<TextField

value={formData.duedate ? new Date(formData.duedate).toISOString().slice(0, 16) : ""} 

        type="datetime-local"
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
              name='taskprogress'
            />

<FormControl fullWidth margin="normal">
              <label>status</label>
              <Select
                name="taskstatus"
                value={formData.taskstatus}
                onChange={handleChange}
                required

              >
                {allstatus.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <label>status</label>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required

              >
                {priorities.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
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
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Save Changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
  </Card>
  </Box>
  )
}

export default Acard
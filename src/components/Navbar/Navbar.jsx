import { AppBar, Toolbar, Typography, Button, IconButton,Box,useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { addTask,getTask,setUser } from "../../redux/Actioins";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTask } from "../../redux/Actioins";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // Import format from date-fns

import {  Dialog,

   DialogActions,
   DialogContent,
   DialogTitle,
   TextField,
   MenuItem,
   Select,
   FormControl,
   useMediaQuery
  
  } from "@mui/material";
const Navbar = (props) => {
  const dispatch = useDispatch();
  const allstatus = ["Completed","In Progress","Started"]; // Categories for the dropdown
  const categories = ["Work", "Personal", "Learning", "Other"]; // Categories for the dropdown
  const priorities = ["Medium", "High", "Low"]; // Categories for the dropdown
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ taskTitle: '',priority:'Medium',duedate:'', taskdetails:'',taskstartedAt:new Date().toLocaleString(),taskendedAt:'', taskprogress:0,taskstatus:'Started',taskCategories:'',username:'',userid:'' });
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userdata=JSON.parse(localStorage.getItem('Profile'))

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate=useNavigate()


    const handleLogout = (e) => {
      dispatch(setUser(null))
      localStorage.removeItem('Profile');

      navigate('/Login')
    };

    const handletitleChange = (e) => {
      // dispatch(setUser(null))
      // dispatch(getTask(userdata))
      if(e.target.value!==""){
        let taskupdated=props.duptasks.filter(d=>d.taskTitle.includes(e.target.value))
        dispatch(setTask(taskupdated))
      }
      else{
        dispatch(setTask(props.duptasks))

      }
    };

    const handleCategoriesChange = (e) => {
      // let userdata=JSON.parse(localStorage.getItem('Profile'))
      // dispatch(getTask(userdata))
      if(e.target.value!==""){
        let taskupdated=props.duptasks.filter(d=>d.taskstatus.includes(e.target.value))
        dispatch(setTask(taskupdated))
      }
      else{
        dispatch(setTask(props.duptasks))

      }
    

    };

    const handleDateChange = (e) => {
      const inputDate = e.target.value;
    // setSelectedDateTime(inputDate);

    // Format the date into "MM/DD/YYYY, hh:mm:ss A"
    if (inputDate) {
      const formatted = format(new Date(inputDate), "M/d/yyyy, h:mm:ss a");
      setFormData({ ...formData, duedate: formatted });

    };
  }
  
    const handleSubmit = (e) => {
      e.preventDefault();

      let maxid=getId()+1
      formData['username']=props?.userInfo!==null?props.userInfo.user?.result?.username : ''
      formData['userid']=props?.userInfo!==null?props?.userInfo?.user.result._id:''
     
     dispatch(addTask(formData.username,formData.priority,formData.duedate,formData.userid,formData.taskTitle,formData.taskdetails,formData.taskstartedAt,formData.taskendedAt,formData.taskprogress,formData.taskstatus,formData.taskCategories))
      handleClose();
    };

    const getId=()=>{
      let ids= props.tasks.map(d=>d.id)
      return Math.max(...ids)

    }
  return (
    <AppBar position="static" sx={{
      width: isMobile ? "170%" : isTablet ? "135%" : isLargeScreen ? "100%" : "100%",
      margin: "0 auto",
    }}>
      <Toolbar>
       
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>

          {/* Search and Status Select */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          { (userdata!==null) ?
            <TextField
              label="Task Title"
              name="taskTitle"
              variant="outlined"
              size="small"
              sx={{ minWidth: 200 }}
              onChange={handletitleChange}
            />:''
          }
{ (userdata!==null)?
 <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
 <Select
   value=""
   onChange={handleCategoriesChange}
   displayEmpty
 >
   <MenuItem value="" disabled>
     Select Status
   </MenuItem>
   {allstatus.map((cat) => (
     <MenuItem key={cat} value={cat}>
       {cat}
     </MenuItem>
   ))}
 </Select>
</FormControl>:''
}
{ (userdata!==null) ?


            <Button size="small" onClick={handleOpen} variant="contained">
              Create Task
            </Button>:''

}
         <Button size="small" onClick={handleLogout} variant="contained">
          Logout
         </Button>
         </Box>




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
              {/* <label>Duration</label>

<TextField
              name="taskduration"
              fullWidth
              margin="normal"
              value={formData.taskduration}
              onChange={handleChange}
              required
            /> */}

<label>duedate</label>
<TextField

// value={formData.duedate}

        type="datetime-local"
        onChange={handleDateChange}
        fullWidth
      />

<FormControl fullWidth margin="normal">
              <label>status</label>
              <Select
                name="taskstatus"
                value={formData.taskstatus}
                // onChange={handleChange}
                required
                disabled

              >
                {allstatus.map((cat) => (
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

            <FormControl fullWidth margin="normal">
              <label>Priorities</label>
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

              </Toolbar>
    </AppBar>
  );
};

export default Navbar;
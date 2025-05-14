import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { addTask, setUser } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTask } from "../../redux/Actions";
import { format } from "date-fns"; // Import format from date-fns
import CloseIcon from "@mui/icons-material/Close";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  useMediaQuery,
} from "@mui/material";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const categories = ["Work", "Personal", "Learning", "Other"]; // Categories for the dropdown
  const theme = useTheme();
  const [todoInput, setTodoInput] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const test = false;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    taskTitle: "",
    duedate: "",
    taskstartedAt: new Date().toLocaleString(),
    taskprogress: 0,
    taskCategories: "",
    username: "",
    userid: "",
    todos: [], // New field to hold todos
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userdata = JSON.parse(localStorage.getItem("Profile"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch(setUser(null));
    localStorage.removeItem("Profile");

    navigate("/Login");
  };

  const handletitleChange = (e) => {
    if (e.target.value !== "") {
      let taskupdated = props.duptasks.filter((d) =>
        d.taskTitle.includes(e.target.value)
      );
      dispatch(setTask(taskupdated));
    } else {
      dispatch(setTask(props.duptasks));
    }
  };

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    if (inputDate) {
      const formatted = format(new Date(inputDate), "M/d/yyyy, h:mm:ss a");
      setFormData({ ...formData, duedate: formatted });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData["username"] =
      props?.userInfo !== null ? props.userInfo.user?.result?.username : "";
    formData["userid"] =
      props?.userInfo !== null ? props?.userInfo?.user.result._id : "";

    formData["done"] = [];

    console.log(formData);
    dispatch(
      addTask(
        formData.username,
        formData.duedate,
        formData.userid,
        formData.taskTitle,
        formData.taskstartedAt,
        formData.taskprogress,
        formData.taskCategories,
        formData.todos,
        formData.done
      )
    );
    handleClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: isMobile
          ? "180%"
          : isTablet
          ? "135%"
          : isLargeScreen
          ? "100%"
          : "100%",
        margin: "0 auto",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Todo Manager
        </Typography>
        {test ? (
          <></>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {userdata !== null ? (
              <TextField
                style={{ font: "black", backgroundColor: "white" }}
                label="Todo Title"
                name="taskTitle"
                size="small"
                sx={{ minWidth: 200 }}
                onChange={handletitleChange}
              />
            ) : (
              ""
            )}
            {userdata !== null ? (
              <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 150 }}
              ></FormControl>
            ) : (
              ""
            )}
            {userdata !== null ? (
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button size="small" onClick={handleOpen} variant="contained">
                  Create Todo
                </Button>
              </Box>
            ) : (
              ""
            )}
            {userdata !== null ? (
              <Button size="small" onClick={handleLogout} variant="contained">
                Logout
              </Button>
            ) : (
              ""
            )}
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <span style={{ fontWeight: "bolder" }}>Create Todo</span>
              </Box>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <label style={{ fontWeight: "600" }}>TodoTitle</label>

              <TextField
                label="Todo Title"
                name="taskTitle"
                fullWidth
                margin="normal"
                value={formData.taskTitle}
                onChange={handleChange}
                required
              />

              <label style={{ fontWeight: "600" }}>Duedate</label>
              <TextField
                // value={formData.duedate}

                type="datetime-local"
                onChange={handleDateChange}
                fullWidth
              />

              <FormControl fullWidth margin="normal">
                <label style={{ fontWeight: "600" }}>Category</label>
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

              <label style={{ fontWeight: "600" }}>Todos</label>
              <Box display="flex" gap={2} alignItems="center" mb={2}>
                <TextField
                  label="Add Todo Item"
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    if (todoInput.trim()) {
                      setFormData((prev) => ({
                        ...prev,
                        todos: [
                          ...(prev.todos || []),
                          {
                            todo: todoInput.trim(),
                            todoId: (prev?.todos?.length || 0) + 1,
                          },
                        ],
                      }));
                      setTodoInput("");
                    }
                  }}
                >
                  Add
                </Button>
              </Box>

              {/* Display added todos */}
              {formData.todos?.length > 0 && (
                <Box mb={2}>
                  {formData.todos.map((todo, idx) => (
                    <Box
                      key={idx}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                      p={1}
                      boxShadow={3}
                      border="1px solid #ccc"
                      borderRadius="4px"
                    >
                      <Typography>{todo.todo}</Typography>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            todos: prev.todos.filter((_, i) => i !== idx),
                          }));
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
              <DialogActions>
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button type="submit" color="primary" variant="contained">
                    Save Changes
                  </Button>
                </Box>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

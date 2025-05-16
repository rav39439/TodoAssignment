import React from "react";
import { useState } from "react";
import { updateTask } from "../../redux/Actions";
import { deleteTask } from "../../redux/Actions";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Dialog,
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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editTodo, setTodoEdit] = useState(false);

  const [currenttodo, setTodo] = useState({});

  const [formData, setFormData] = useState({
    taskTitle: props.task.taskTitle,
    duedate: props.task.duedate,
    username: props.task.username,
    userid: props.task.userid,
    taskstartedAt: props.task.taskstartedAt,
    taskprogress: props.task.taskprogress,
    taskCategories: props.task.taskCategories,
    todos: props.task.todos || [],
    done: props.task.done || [],
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setTodoEdit(false);
  const [newtodoInput, setnewTodoInput] = useState("");
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handletimeChange = (newValue) => {
    setFormData({ ...formData, duedate: new Date(newValue.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData._id = props.task._id;
    formData.taskprogress = String(
      Math.floor(
        (formData.done.length /
          (formData.todos.length + formData.done.length)) *
          100
      )
    );
    dispatch(updateTask(formData, props.task._id));
    handleClose();
  };

  const deletetask = (id) => {
    console.log(id);
    dispatch(deleteTask(id));
  };

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

  return (
    <tr>
      {/* Delete Icon & Overdue Label */}
      <td>
      {props.task.taskTitle}
      </td>
      <td>
        <Typography variant="body2">
          Progress: {props.task.taskprogress}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={props.task.taskprogress}
          sx={{ height: 8, borderRadius: 6 }}
        />
      </td>

      <td>
        {formatDate(props.task.taskstartedAt)}
        <br />
      </td>
      <td>
        {formatDate(props.task.duedate)}
        <br />
      </td>

      <td>{props.task.taskCategories}</td>
      <td>
        <Link to="/viewtask" state={props.task}>
          <VisibilityIcon />
        </Link>
        <br />
      </td>
      <td>
        <FaEdit
          size={24}
          onClick={handleOpen}
          variant="contained"
          style={{ cursor: "pointer", color: "blue", fontSize: "5px" }}
        >
          Edit Todo
        </FaEdit>
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
                <span style={{ fontWeight: "bolder" }}>Edit Todo</span>
              </Box>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <label style={{ fontWeight: "600" }}>Todo Title</label>
              <TextField
                name="taskTitle"
                fullWidth
                margin="normal"
                value={formData.taskTitle}
                onChange={handleChange}
                required
              />

              <label style={{ fontWeight: "600" }}>Due Date</label>
              <TextField
                type="datetime-local"
                value={
                  formData.duedate
                    ? new Date(formData.duedate).toISOString().slice(0, 16)
                    : ""
                }
                onChange={handletimeChange}
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
                  value={newtodoInput}
                  onChange={(e) => setnewTodoInput(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    if (newtodoInput.trim()) {
                      setFormData((prev) => ({
                        ...prev,
                        todos: [
                          ...(prev.todos || []),
                          {
                            todo: newtodoInput.trim(),
                            todoId: (prev?.todos?.length+prev?.done?.length) + 1,
                          },
                        ],
                      }));
                      console.log(formData)
                      setnewTodoInput("");
                    }
                  }}
                >
                  Add
                </Button>
              </Box>

              <Box mt={3}>
                <Typography style={{ fontWeight: "bold" }}>
                  Todos Pending
                </Typography>
                {formData.todos?.length > 0 ? (
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
                          color="green"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              done: [
                                ...(prev.done || []),
                                { todo: todo.todo, todoId: todo.todoId },
                              ],
                            }));

                            setFormData((prev) => ({
                              ...prev,
                              todos: prev.todos.filter(
                                (t) => t.todoId !== todo.todoId
                              ),
                            }));
                          }}
                        >
                          Complete
                        </Button>

                        <Button
                          size="small"
                          color="green"
                          onClick={() => {
                            setTodo(todo);
                            setTodoEdit(true);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          color="green"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              todos: prev.todos.filter(
                                (t) => t.todoId !== todo.todoId
                              ),
                            }));
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  "All todos have been completed"
                )}
              </Box>
              <Box mt={3}>
                <Typography style={{ fontWeight: "650" }}>
                  Todos Completed
                </Typography>

                {formData.done?.length > 0 ? (
                  <Box mb={2}>
                    {formData.done.map((todo, idx) => (
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
                          color="green"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              todos: [
                                ...(prev.todos || []),
                                { todo: todo.todo, todoId: todo.todoId },
                              ],
                            }));
                            setFormData((prev) => ({
                              ...prev,
                              done: prev.done.filter(
                                (t) => t.todoId !== todo.todoId
                              ),
                            }));
                          }}
                        >
                          Undo
                        </Button>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  "No todos have been completed"
                )}
              </Box>
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
      </td>
      <td>
        <Dialog open={editTodo} onClose={handleCloseEdit}>
          <DialogTitle>Update Todo</DialogTitle>

          <DialogContent>
            <label style={{ fontWeight: "600" }}>Todo</label>
            <TextField
              type="text"
              defaultValue={currenttodo.todo ? currenttodo.todo : ""}
              onChange={(e) => {
                setTodo({ ...currenttodo, todo: e.target.value });
              }}
            />
          </DialogContent>

          <DialogActions>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    todos: prev.todos.map((t) =>
                      t.todoId === currenttodo.todoId ? currenttodo : t
                    ),
                  }));
                  setTodoEdit(false);
                }}
              >
                Save Todo
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        <FaTrash
          size={24}
          style={{ color: "red" }}
          onClick={() => deletetask(props.task._id)}
          sx={{
            backgroundColor: "red",
          }}
        >
          <DeleteIcon />
        </FaTrash>
      </td>
    </tr>
  );
};

export default Taskrow;

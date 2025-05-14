import React from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Box,
  LinearProgress,
} from "@mui/material";

const Viewtask = () => {
  const location = useLocation();
  const data = location.state || "";
  const {
    taskTitle,
    taskprogress,
    username,
    taskCategories,
    duedate,
    taskstartedAt,
    done,
  } = data;

  const formatDate = (date) => new Date(date).toLocaleString();
  console.log(data);
  return (
    <Card
      sx={{ maxWidth: 800, margin: "2rem auto", borderRadius: 3, boxShadow: 3 }}
    >
      <CardHeader
        title={taskTitle}
        subheader={`Category: ${taskCategories}`}
        titleTypographyProps={{ fontSize: "1.5rem", fontWeight: "bold" }}
        subheaderTypographyProps={{
          fontSize: "0.9rem",
          color: "text.secondary",
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Assigned to: <strong>{username}</strong>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Started At: {formatDate(taskstartedAt)}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Due Date: {formatDate(duedate)}
        </Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body2" mr={1}>
            Progress:
          </Typography>
          <Box width="100%">
            <LinearProgress variant="determinate" value={taskprogress} />
          </Box>
          <Typography variant="body2" ml={1}>
            {taskprogress}%
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Completed Tasks
        </Typography>

        {done.length > 0 ? (
          <List dense>
            {done.map((item) => (
              <ListItem key={item.todoId} disablePadding>
                <ListItemText
                  primary={`• ${item.todo}`}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontFamily: "inherit",
                    fontWeight: "0.95rem",
                    style: { marginLeft: "0.5rem" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Chip label="No completed tasks" variant="outlined" />
        )}
      </CardContent>
    </Card>
  );
};

export default Viewtask;

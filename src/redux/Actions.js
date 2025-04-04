import * as api from "./api"; // Always place imports at the top

export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";

export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_TASK_NULL = "SET_TASK_NULL";
export const SET_DUPTASK_NULL = "SET_DUPTASK_NULL";
export const ADD_DUPTASK_SUCCESS = "ADD_DUPTASK_SUCCESS";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const SET_MESSAGE_SUCCESS = "SET_MESSAGE_SUCCESS";

export const GET_MESSAGE_SUCCESS = "GET_MESSAGE_SUCCESS";
export const GET_TASK_SUCCESS = "GET_TASK_SUCCESS";
export const SET_TASK_SUCCESS = "SET_TASK_SUCCESS";
export const DUP_TASK_SUCCESS = "DUP_TASK_SUCCESS";
export const DELETE_DUPTASK_SUCCESS = "DELETE_DUPTASK_SUCCESS";


// export const addTask = (id,username,duedate,userid,taskTitle,taskdetails,taskstartedAt,taskendedAt,taskprogress,taskstatus, taskCategories) => {
//     return {
//       type: ADD_TASK_SUCCESS,
//       payload: {id,username,duedate,userid,taskTitle,taskdetails,taskstartedAt,taskendedAt,taskprogress,taskstatus, taskCategories },
//     };
//   };

export const addTask =
  (
    username,
    priority,
    duedate,
    userid,
    taskTitle,
    taskdetails,
    taskstartedAt,
    taskendedAt,
    taskprogress,
    taskstatus,
    taskCategories
  ) =>
  async (dispatch) => {
    try {
      let taskdata = {
        username,
        priority,
        duedate,
        userid,
        taskTitle,
        taskdetails,
        taskstartedAt,
        taskendedAt,
        taskprogress,
        taskstatus,
        taskCategories,
      };
      const { data } = await api.addnewtask(taskdata);
      let userdata = JSON.parse(localStorage.getItem("Profile"));
      dispatch(getTask(userdata));
      dispatch(dupTask(userdata));

      // dispatch({ type: "ADD_TASK_SUCCESS", payload: taskdata });
      dispatch({ type: "ADD_DUPTASK_SUCCESS", payload: taskdata });

      // dispatch(())
    } catch (err) {
      console.log(err);
    }
  };

// export const getTask = (taskTitle,taskdetails,taskstartedAt,taskendedAt,taskprogress,taskstatus, taskCategories) => {
//   return {
//     type: GET_TASK_SUCCESS,
//   //   payload: {taskTitle,taskdetails,taskstartedAt,taskendedAt,taskprogress,taskstatus, taskCategories },
//   };
// };

export const getTask = (user) => async (dispatch) => {
  try {
    if (user !== null) {
      const { data } = await api.getalltasksforuser(user.result._id);
     
      dispatch({ type: "GET_TASK_SUCCESS", payload: data });
    } else {
      dispatch({ type: "GET_TASK_SUCCESS", payload: [] });
    }
  } catch (err) {
    console.log(err);
  }
};

export const dupTask = (user) => async (dispatch) => {
  try {
    if (user !== null) {
      const { data } = await api.getalltasksforuser(user.result._id);
      dispatch({ type: "DUP_TASK_SUCCESS", payload: data });
    } else {
      dispatch({ type: "DUP_TASK_SUCCESS", payload: [] });
    }
  } catch (err) {
    console.log(err);
  }
};

export const setTask = (task) => ({
  type: SET_TASK_SUCCESS,
  payload: task,
});

export const setTaskNull = () => ({
  type: SET_TASK_NULL,
  
});

// export const setdupTaskNull = () => ({
//   type: SET_DUPTASK_NULL,
  
// });


// export const updateTask = (task) => ({
//   type: UPDATE_TASK_SUCCESS,
//   payload: task
// });
export const updateTask = (task, id) => async (dispatch) => {
  try {
    const { data } = await api.updatetask(task, id);

    const dateObject = new Date(task.duedate);

    // Convert Date object to ISO format
    const isoDate = dateObject.toISOString();
    task.duedate = isoDate;

    dispatch({ type: "UPDATE_TASK_SUCCESS", payload: task });
  } catch (err) {
    console.log(err);
  }
};

// export const deleteTask = (id) => ({
//   type: DELETE_TASK_SUCCESS,
//   payload: id,
// });

export const deleteTask = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletetask(id);

    dispatch({ type: "DELETE_TASK_SUCCESS", payload: id });
    // dispatch({ type: "DELETE_DUPTASK_SUCCESS", payload: id });

  } catch (err) {
    console.log(err);
  }
};

export const setUser = (user) => ({
  type: SET_USER_SUCCESS,
  payload: user,
});

export const getUser = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data,
  };
};

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.SignUp(authData);
    dispatch({ type: "DUP_TASK_SUCCESS", payload: [] });

    dispatch({ type: "SET_TASK_NULL",payload:[] });
    dispatch({ type: "AUTH", data });
    dispatch(setUser(JSON.parse(localStorage.getItem("Profile"))));
     navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
   
    
    dispatch({ type: "AUTH", data });
    dispatch(setUser(JSON.parse(localStorage.getItem("Profile"))));
    let userdata = JSON.parse(localStorage.getItem("Profile"));
    dispatch(getTask(userdata));
    dispatch(dupTask(userdata));

    //console.log(data)
    navigate("/");
  } catch (err) {
    dispatch({type:'CHANGE',payload:err.response.data})
  }
};

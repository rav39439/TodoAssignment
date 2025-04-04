import {
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  SET_USER_SUCCESS,
  GET_USER_SUCCESS,
  GET_TASK_SUCCESS,
  GET_MESSAGE_SUCCESS,
  SET_MESSAGE_SUCCESS,
  SET_TASK_NULL,
  SET_TASK_SUCCESS,
  DUP_TASK_SUCCESS

} from "./Actions";

const initialState = {
  tasks: [

  ],
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload], // ✅ Append new task to existing tasks
      };

    case GET_TASK_SUCCESS:
      return{...state,tasks:[...action.payload]}


      case SET_TASK_NULL:
      return{...state,tasks:[]}

      case SET_TASK_SUCCESS:
        return{...state,tasks:action.payload}

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(
          (task) => (task._id === action.payload._id ? action.payload : task) // ✅ Update existing task
        ),
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task._id !== action.payload // ✅ Update existing task
        ),
      };

    default:
      return state;
  }
};

const duptasks = {
  duptasks: [

  ],
};

const dupReducer = (state = duptasks, action) => {
  switch (action.type) {

  case DUP_TASK_SUCCESS:
    return{...state,duptasks:[...action.payload]}

  
  default:
    return state; // Ensure default state is returned
  }
}

// New Users Reducer
const initialStateuser = null; // State starts as null

const UsersReducer = (state = initialStateuser, action) => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return {
        ...state, // Ensure existing state is preserved
        user: action.payload, // Store user object
      };

    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };

    case GET_USER_SUCCESS:
      return state; // Return the current state when retrieving user

    default:
      return state; // Ensure default state is returned
  }
};


const initialMessage = null; // State starts as null

const messageReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case SET_MESSAGE_SUCCESS:
      return {
        ...state, // Ensure existing state is preserved
        message: action.payload, // Store user object
      };

    case "CHANGE":
      return { ...state, data: action?.payload };

    case GET_MESSAGE_SUCCESS:
      return state; // Return the current state when retrieving user

    default:
      return state; // Ensure default state is returned
  }
};

export { TaskReducer, UsersReducer ,messageReducer,dupReducer};

import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { TaskReducer ,UsersReducer,messageReducer} from "./Reducers";
//const ConfigureStore=()=>{


const reducer = combineReducers({
    TaskReducer,
    UsersReducer,
    messageReducer

   
  })
  const store = configureStore({
    reducer
  })
  export default store;
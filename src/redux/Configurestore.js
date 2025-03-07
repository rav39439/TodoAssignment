import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { TaskReducer ,UsersReducer,messageReducer,dupReducer} from "./Reducers";
//const ConfigureStore=()=>{


const reducer = combineReducers({
    TaskReducer,
    UsersReducer,
    messageReducer,
    dupReducer

   
  })
  const store = configureStore({
    reducer
  })
  export default store;
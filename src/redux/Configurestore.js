import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { TaskReducer ,UsersReducer} from "./Reducers";
//const ConfigureStore=()=>{





const reducer = combineReducers({
    TaskReducer,
    UsersReducer 

   
  })
  const store = configureStore({
    reducer
  })
  export default store;
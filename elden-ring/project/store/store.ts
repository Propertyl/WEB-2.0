import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import GlobalParams from './Slices/AllSubParams'
import { Global } from "./Reducers/Global";

const store:Store = configureStore({
   reducer:{
     global:GlobalParams,
     general:Global
   }
})

export default store
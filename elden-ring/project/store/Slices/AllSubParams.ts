import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"

interface Params{
   titleName:string,
   buttonSound:boolean,
   activePage:string,
   videoPlay:boolean,
   language:string,
   newsGetted:boolean,
   WindowSize:number,
   AllowPageSlide:boolean,
   smart:boolean | null,
   orientation:string
}

const initialState:Params = {
   titleName:"",
   buttonSound:false,
   activePage:"",
   videoPlay:false,
   language:"",
   newsGetted:false,
   WindowSize:0,
   AllowPageSlide:true,
   smart:null,
   orientation:""
}

const GlobalParams = createSlice({
   name:"Global",
   initialState,
   reducers:{
     setTitleName:(state,action) => {state.titleName = action.payload},
     setButtonSound:(state,action) => {state.buttonSound = action.payload},
     setActivePage:(state,action) => {state.activePage = action.payload},
     setVideoPlay:(state,action) => {state.videoPlay = action.payload},
     setLanguage:(state,action) => {state.language = action.payload},
     setNewsGetted:(state,action) => {state.newsGetted = action.payload},
     setWindowSize:(state,action) => {state.WindowSize = action.payload},
     setAllowPageSlide:(state,action) => {state.AllowPageSlide = action.payload},
     setSmart:(state,action) => {state.smart = action.payload},
     setOrientation:(state,action) => {state.orientation = action.payload}
   }
})

export const {setTitleName,setButtonSound,setActivePage,setVideoPlay,setLanguage,setNewsGetted,setWindowSize,setAllowPageSlide,setSmart,setOrientation} = GlobalParams.actions

export default GlobalParams.reducer


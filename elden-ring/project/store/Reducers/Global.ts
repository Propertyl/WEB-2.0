
import { createAction, createReducer } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import {GetCurrentCharacters, GetCurrentLocations, GetCurrentNews, GetNews } from "../ApiFunctions/GlobalFunctions";


export const CleanNews = createAction<any>("Clear")

const initialState = {
  event:{},
  currentEvent:{state:"Loading"},
  locations:{},
  characters:{},
  connectSucefull:{error:""}
}

export const Global:Reducer = createReducer(initialState,(builder) => {
    builder
    .addCase(GetNews.fulfilled,(state,action) => {
        state.event = action.payload
    })
    .addCase(GetCurrentNews.fulfilled,(state,action) => {
       state.currentEvent = action.payload
    })
    .addCase(CleanNews,(state,action) => {
       state.currentEvent = action.payload
    })
    .addCase(GetCurrentLocations.fulfilled,(state,action) => {
       state.locations = action.payload
    })
    .addCase(GetCurrentCharacters.fulfilled,(state,action) => {
       state.characters = action.payload
    })
    .addDefaultCase((state) => state)
})
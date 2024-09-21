import { Reducer, Slice } from "@reduxjs/toolkit";
import { QueryError, QueryResult } from "mysql2";

export type ApiFunc = (err:QueryError | null,result:QueryResult) => any

export type Store = {
   global:any,
   general:any
}

export type AsyncFunc = any extends void ? any[] : any

export type TitleText = {
   'uk':string,
   'en':string
}
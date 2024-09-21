import { AsyncFunc } from "@/types/allTypes";
import { AsyncThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CleanNews } from "../Reducers/Global";

const GetNews:AsyncFunc = createAsyncThunk("news",
 async (lang:string) => {
     if(lang == 'uk'){
        const start = await fetch('/api/data/NewsInfoUA')

        const  NewsData = await start.json()

        return NewsData
     } else if(lang == "en"){
      const start = await fetch('/api/data/NewsInfoEN')

      const  NewsData = await start.json()

      return NewsData
     }
 })

 const GetCurrentNews:AsyncFunc = createAsyncThunk('currentNews', 
 async ({lang,id}:{lang:string,id:any}) => {
    console.log("lang:",lang,"Id:",id)
    const start = await fetch('/api/data/DetailNewsInfo',{
       method:'PUT',
       headers:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify({
          lang:lang,
          id:id
       })
    })

    const CurrentNewsData = await start.json()

    return CurrentNewsData
 })

 const ClearCurrentNews = () => {
    
   return CleanNews({})
}


 const GetCurrentLocations:AsyncFunc = createAsyncThunk('locations',
 async(lang:string) => {
     if(lang == "uk"){
        const Locations = await fetch('/api/data/LocationsUA')

        const LocationsData = await Locations.json()

        return LocationsData
     } else {
      const Locations = await fetch('/api/data/LocationsEN')

      const LocationsData = await Locations.json()

      return LocationsData
     }
})

 const GetCurrentCharacters:AsyncFunc = createAsyncThunk('characters',
 async(lang:string) => {
     if(lang == "uk"){
        const start = await fetch('/api/data/CharactersUA')

        const CharactersData = await start.json()

        return CharactersData
     } else {
      const start = await fetch('/api/data/CharactersEN')

      const CharactersData = await start.json()

      return CharactersData
     }
 })

 export {GetCurrentCharacters,GetCurrentLocations,GetNews,GetCurrentNews,ClearCurrentNews}
import { Store } from "@/types/allTypes";

 const GetActivePage = (state:Store) => state.global.activePage
 const GetVideoPlay = (state:Store) => state.global.videoPlay
 const GetEvents = (state:Store) => state.general.event
 const GetLanguage = (state:Store) => state.global.language
 const GetCurEvent = (state:Store) => state.general.currentEvent
 const GetNewsGetted = (state:Store) => state.global.newsGetted
 const GetLocations = (state:Store) => state.general.locations
 const GetButtonSound = (state:Store) => state.global.buttonSound
 const GetCharacters = (state:Store) => state.general.characters
 const GetConnectedToDataBase = (state:Store) => state.general.connectSucefull
 const GetWindowSize = (state:Store) => state.global.WindowSize
 const GetAllowPageSlide = (state:Store) => state.global.AllowPageSlide
 const GetSmart = (state:Store) => state.global.smart
 const GetOrientation = (state:Store) => state.global.orientation
 export {GetActivePage,GetVideoPlay,GetEvents,GetLanguage,GetCurEvent,GetNewsGetted,GetLocations,GetButtonSound,GetCharacters,GetConnectedToDataBase,GetWindowSize,GetAllowPageSlide,GetSmart,GetOrientation}

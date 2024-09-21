import { GetLanguage } from "@/store/Selectors/globalSelectors"
import { useSelector } from "react-redux"

const AlertPage = () => {
  const lang = useSelector(GetLanguage)
   return(
     <div className="location-slider-alert">
       <p className="location-slider-alert-text">{lang == "uk" ? "Натисніть на зображення локації,щоб подивитись її опис" : "Tap on location image to see she's description"}</p>
     </div>
   )
}

export default AlertPage
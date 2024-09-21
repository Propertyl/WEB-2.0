import { GetLanguage } from "@/store/Selectors/globalSelectors"
import { useSelector } from "react-redux"

const LoadingSection = () => {
  const lang = useSelector(GetLanguage)
   return(
      <div className="container" data-loading-container="">
           <p className="loading-name">{lang == "uk" ? "Завантаження" : "Loading"}</p>
           <ul className="loading-dots-container">
             <li className="loading-dot"></li>
             <li className="loading-dot"></li>
             <li className="loading-dot"></li>
           </ul>
      </div>
   )
}


export const LoadingDataSection = () => {
  const lang = useSelector(GetLanguage)
    return(
       <div className="container" data-loading-data-container="">
           <div className="loading-data-image-container">
            <img className="loading-data-image" src="/wait-data.gif" alt="loading-gif" />
           </div>
           <div className="loading-data-text-container">
            <p className="loading-name">{lang == "uk" ? "Отримуємо дані" : "Get data"}</p>
           </div>
       </div>
    )
}

export default LoadingSection
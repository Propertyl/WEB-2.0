import { GetDetailTypes } from "@/LanguageText/GetNewsTypesText"
import { GetCurEvent, GetLanguage} from "@/store/Selectors/globalSelectors"
import { setLanguage } from "@/store/Slices/AllSubParams"
import store from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import {useEffect,useState } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"


const NewsDetailPage = () => {
  return(
    <Provider store={store}>
      {store  &&  <NewsDetail/>}
    </Provider>
  )
}

const NewsDetail = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const lang = useSelector(GetLanguage)
  const currentEvent = useSelector(GetCurEvent)
  const [eventID,seteventID] = useState<string | any>("")
  const [dataRecieved,setdataRecieved] = useState<boolean>(false)
  const Back = async () => {
    router.push(`/${lang}/main#news`)
  }
  useEffect(() => {
     if(!lang && router.query.language){
        const language = router.query.language
        dispatch(setLanguage(language))
     }
  },[lang,router])
  useEffect(() => {
     if(router.query.id){
        seteventID(router.query.id)
     }
  },[router.query])
  useEffect(() => {
      if(lang.length && eventID && !dataRecieved){
        console.log("ID:",eventID)
        const GetCurrentNewsAsync = async () => {
          const { GetCurrentNews } = await import('@/store/ApiFunctions/GlobalFunctions');
          dispatch(GetCurrentNews({lang:lang,id:eventID}))
          setdataRecieved(true)
        }
        GetCurrentNewsAsync()
     }
  },[lang,eventID,dataRecieved])
  useEffect(() => {
     console.log("current:",currentEvent)
  },[currentEvent])
   return(
    <>
      <Head>
        <title>{currentEvent.news_name}</title>
      </Head>
      <div className="current-news-bg"></div>
      <div className="current-news-section">
      <div className="current-news-back-section">
         <button className="current-news-back-button" onClick={() => Back()}>{lang == "uk" ? "Повернутись" : "Back"}</button>
      </div>
         <span className="current-news-type">{GetDetailTypes(currentEvent.news_type,lang)}</span>
         <div className="container" data-current-news="">
             <div className="current-news-header">
                <div className="container">
                   <p className="header-text">{currentEvent.news_name}</p>
                </div>
             </div>
             <div className="current-news-main">
               <div className="container" data-slider-container="">
                 <p className="news-main-text">{currentEvent.news_text}</p>
               </div>
             </div>
         </div>
      </div>
    </>
   )
}

export default NewsDetailPage
import GetTypesText from "@/LanguageText/GetNewsTypesText"
import { GetOGDescriptionText, GetOGTitleText } from "@/LanguageText/GetOGText"
import { GetNews } from "@/store/ApiFunctions/GlobalFunctions"
import { GetEvents,GetLanguage, GetSmart} from "@/store/Selectors/globalSelectors"
import { setAllowPageSlide } from "@/store/Slices/AllSubParams"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState,useRef,useEffect, startTransition } from "react"
import { useDispatch, useSelector } from "react-redux"


const NewsPage = () => {
  const dispatch = useDispatch()
  const [newsTypes,setnewsTypes] = useState<string[]>([])
  const [activeNews,setactiveNews] = useState<string>("")
  const [newsPosition,setnewsPosition] = useState<number>(0)
  const [drag,setDrag] = useState<boolean>(false)
  const [startMove,setstartMove] = useState<boolean>(false)
  const [firstTouch,setfirstTouch] = useState<number>(0)
  const [mouseMove,setmouseMove] = useState<number>(0)
  const [dragMove,setdragMove] = useState<number>(0)
  const [index,setIndex] = useState<number>(0)
  const Events = useSelector(GetEvents)
  const lang = useSelector(GetLanguage)
  const SmartDevice = useSelector(GetSmart)
  const AllNews = useRef<any>(null)
  const UpdatesNews = useRef<any>(null)
  const NoticeNews = useRef<any>(null)
  const NewsList = useRef<any>(null)
  const FilterNews = (type:string) => {
     if(type && Events.length){
       const filter = Events.filter((current:any) => current.news_type == type)
 
       return filter
     } else {
        return Events
     }
  } 
  const ControlWithNames = (indexulya:number) => {
    const type = newsTypes[indexulya]
    setactiveNews(type)
    setIndex(indexulya)
      switch(type){
      case newsTypes[0]:
        setnewsPosition(AllNews.current.offsetLeft)
        break;
      case newsTypes[1]:
        setnewsPosition(UpdatesNews.current.offsetLeft)
        break;
      case newsTypes[2]:
        setnewsPosition(NoticeNews.current.offsetLeft)
         break;
      default:
        return
    }
  }
  useEffect(() => {
    startTransition(() => {
       if(!Events.length && lang){
         dispatch(GetNews(lang))
       } 
    })
  },[lang])
  useEffect(() => {
     startTransition(() => {
      if(!activeNews && newsTypes.length){
        setactiveNews(newsTypes[0])
      }
     })
  },[activeNews,newsTypes])
  useEffect(() => {
     startTransition(() => {
      if(lang){
        setnewsTypes(GetTypesText(lang))
       }
     })
  },[lang])
  useEffect(() => {
   const ChangeSlide = () => {
     if(activeNews == newsTypes[0]){
       setnewsPosition(AllNews.current.offsetLeft)
    }
     if(activeNews == newsTypes[1]){
       setnewsPosition(UpdatesNews.current.offsetLeft)
    }
     if(activeNews == newsTypes[2]){
       setnewsPosition(NoticeNews.current.offsetLeft)
    }
   }
     window.addEventListener("resize",ChangeSlide)
 
     return () => {
       window.removeEventListener("resize",ChangeSlide)
     }
  },[activeNews])
  useEffect(() => {
     const startDrag = (event:MouseEvent) => {
          setDrag(true)
          setfirstTouch(event.clientX)
          setmouseMove(event.clientX)
     }
     const touchStart = (event:TouchEvent) => {
        const touch = event.touches[0]
        setfirstTouch(touch.clientX)
        setmouseMove(touch.clientX)
        setDrag(true)
     }

     const touchMove = (event:TouchEvent) => {
        if(!drag){
           return
        } else {
           const touch = event.touches[0]
           const currentPos = touch.clientX
           const amplitude = mouseMove - currentPos
           
           if(amplitude > 0){
            setnewsPosition(value => Math.min(value + amplitude, NewsList.current.offsetWidth * (newsTypes.length - 1)));
           } 
           if(amplitude < 0){
            setnewsPosition(value => Math.max(value + amplitude, 0));
           } 
           
           setstartMove(true)
           setmouseMove(currentPos)
           setdragMove(value => value + amplitude)
          
          if(Math.abs(dragMove) > 70){
            dispatch(setAllowPageSlide(false))
          }
        }
     }
    const MouseMove = (event:MouseEvent) => {
       if(drag){
          const currentPos = event.clientX
          const amplitude = mouseMove - currentPos
          
          if(amplitude > 0){
           setnewsPosition(value => Math.min(value + amplitude, NewsList.current.offsetWidth * (newsTypes.length - 1)));
          } 
          if(amplitude < 0){
           setnewsPosition(value => Math.max(value + amplitude, 0));
          } 
          
          setstartMove(true)
          setmouseMove(event.clientX)
          setdragMove(value => value + amplitude)
          
          if(Math.abs(dragMove) > 100){
            dispatch(setAllowPageSlide(false))
          }
       } else {
         return
       }
    }
    const touchEnd = (event:TouchEvent) => {
      const touch = event.changedTouches[0]
      let endTouch = touch.clientX
      let newIndex = 0
      setDrag(false)
      setdragMove(0)
      dispatch(setAllowPageSlide(true))
    if (firstTouch > endTouch && index < newsTypes.length - 1) {
        newIndex = index + 1
     } else if (firstTouch < endTouch && index > 0) {
        newIndex = index - 1
     } else {
        newIndex = index
     }
     ControlWithNames(newIndex);
     setstartMove(false)
    }
    const endDrag = (event:MouseEvent) => {
       let endTouch = event.clientX
       let newIndex = 0
       setDrag(false)
       dispatch(setAllowPageSlide(true))
     if (firstTouch > endTouch && index < newsTypes.length - 1) {
         newIndex = index + 1;
      } else if (firstTouch < endTouch && index > 0) {
         newIndex = index - 1;
      } else {
         newIndex = index;
      }
      ControlWithNames(newIndex);
      setstartMove(false)
 
    }
    
    if(NewsList.current){
     NewsList.current.addEventListener("mousedown",startDrag)
     NewsList.current.addEventListener("touchstart",touchStart)
    }
    if(drag){
     window.addEventListener("mousemove",MouseMove)
     window.addEventListener("mouseup",endDrag)
    }
    if(SmartDevice && drag){
       window.addEventListener("touchmove",touchMove)
       window.addEventListener("touchend",touchEnd)
    }
 
    return () => {
       if(NewsList.current){
         NewsList.current.removeEventListener("mousedown",startDrag)
         NewsList.current.addEventListener("touchstart",touchStart)
       }
       window.removeEventListener("mousemove",MouseMove)
       window.removeEventListener("mouseup",endDrag)
       window.removeEventListener("touchmove",touchMove)
       window.removeEventListener("touchend",touchEnd)
    }
  },[drag,firstTouch,mouseMove,newsPosition,index,activeNews,SmartDevice])
    return(
      <>
       <Head>
       <meta property="og:title" content={GetOGTitleText('news',lang)}/>
       <meta property="og:description" content={GetOGDescriptionText('news',lang)}/>
       <meta property="og:image" content="https://www.cnet.com/a/img/resize/43bf7152f39f90a03df23c97a8a7ebb9a09ea520/hub/2022/02/23/f12a8db7-d99b-4b8d-9b09-d84f12661cf7/elden-ring-plakat.jpg?auto=webp&fit=bounds&height=1200&precrop=571,571,x357,y149&width=1200" />
       </Head>
       <div className="page-section">
          <div className="news-slider-section">
            <div className="container" data-slider-container="">
                <div className="news-types-section">
                  <div className="container">
                    <ul className="news-types-list">
                      { newsTypes.map((type,index) => (
                        <li onClick={() => ControlWithNames(index)} className={activeNews == type ? "news-type news-type-active" : "news-type"} key={`news-type-item-${index}`} data-news-type-text={type}>
                          <div className="container">
                            <p className="news-type-text">{type}</p>
                          </div>
                        </li>
                      ))
                      }
                    </ul>
                  </div>
                </div>
                <div className="news-main-section">
                  <div className="container">
                    <ul  ref={NewsList} style={{transform:`translateX(-${newsPosition}px)`,transition:!drag ? "all .2s" : "0s"}} className="news-slider">
                         <li  ref={AllNews} className="news-slide" data-moving-slide={startMove}>
                         <NewsTypePage  Events={FilterNews("")}/>
                         </li>
                         <li  ref={UpdatesNews} className="news-slide" data-moving-slide={startMove}>
                         <NewsTypePage Events={FilterNews("Updates")}/>
                         </li>
                         <li  ref={NoticeNews} className="news-slide" data-moving-slide={startMove}>
                         <NewsTypePage Events={FilterNews("Notice")}/>
                         </li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
       </div>
     </>
    )
 }
 
 const NewsTypePage = ({Events}:{Events:any}) => {
    return(
       <div className="container">
          <ul className="slide-news-list">
            {Events.length && Events.map((currentEvent:any,index:number) => (
             <News key={`news-slide-item-${index}`} currentEvent={currentEvent}/>
            ))
            }
          </ul>
       </div>
    )
 }
 
 const News = ({currentEvent}:{currentEvent:any}) => {
   const router = useRouter()
   const lang = useSelector(GetLanguage)
    return(
      <li onClick={() => router.push(`/${lang}/news-detail/${currentEvent.news_id}`)} className="news-item">
       <div className="container">
         <div className="news-item-block">
           <p className="news-item-text">{currentEvent.news_name}</p>
         </div>
         <div className="news-item-block">
           <p className="news-item-text">{currentEvent.news_date}</p>
         </div>
       </div>
      </li>
    )
 }
 
 export default NewsPage
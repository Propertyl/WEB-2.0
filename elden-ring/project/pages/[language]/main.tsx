'use client'
import Head from "next/head"
import Navigation from "@/layouts/Navigation"
import { GetActivePage, GetAllowPageSlide, GetConnectedToDataBase, GetEvents, GetLocations, GetOrientation, GetSmart, GetVideoPlay} from "@/store/Selectors/globalSelectors"
import store from "@/store/store"
import {Suspense, lazy, useEffect, useRef, useState, useTransition } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { setActivePage, setLanguage, setOrientation, setSmart, setWindowSize} from "@/store/Slices/AllSubParams"
import { GetTitleText} from "@/LanguageText/GetTitleText"
import {TitleText } from "@/types/allTypes"
import { useRouter } from "next/router"
import CheckOrientation from "@/Functions/CheckOrientation"
import LoadingSection, { LoadingDataSection } from "@/Components/LoadingSuspense"
import DownloadPage from "@/layouts/SliderPages/Download"
import NewsPage from "@/layouts/SliderPages/News"
import LocationsPage from "@/layouts/SliderPages/Locations"
import CharactersPage from "@/layouts/SliderPages/Characters"

const MainGlobal = () => {
   return(
     <Provider store={store}>
        <MainPage/>
     </Provider>
   )
}


const MainPage = () => {
  let timer:any = null
  const dispatch = useDispatch()
  const router = useRouter()
  const [lang,setLang] = useState<keyof TitleText | any>("")
  const [canScroll,setcanScroll] = useState<boolean>(true)
  const [index,setIndex] = useState<number>(0)
  const [listLeft,setlistLeft] = useState<number>(0)
  const [draged,setDraged] = useState<boolean>(false)
  const [smartTransition,setsmartTransition] = useState<boolean>(false)
  const [firstTouch,setfirstTouch] = useState<number>(0)
  const [mouseMove,setmouseMove] = useState<number>(0)
  const [catchIndex,setcatchIndex] = useState<boolean>(false)
  const orientation = useSelector(GetOrientation)
  const pages:string[] = ["","news","locations","characters"]
  const activePage = useSelector(GetActivePage)
  const videoPlay = useSelector(GetVideoPlay)
  const Events = useSelector(GetEvents)
  const Locations = useSelector(GetLocations)
  const AllowPageSlide = useSelector(GetAllowPageSlide)
  const SmartDevice = useSelector(GetSmart)
  const PagesList = useRef<any>(null)
  const DownloadRef = useRef<any>(null)
  const NewsRef = useRef<any>(null)
  const LocationsRef = useRef<any>(null)
  const CharactersRef = useRef<any>(null)
  const CallsCount = useRef<any>(0)
  const checkWindowOrientation = () => {
      if(window.screen.orientation){
      const type = window.screen.orientation.type
       
      if(type.split('-')[0] != orientation){
         dispatch(setOrientation((type.split('-')[0])))
         ListPosition()
      }
    }
  }

  const checkWindowSize = () => {
    dispatch(setWindowSize(window.innerWidth))
    if(window.innerWidth <= 1370){
      dispatch(setSmart(true))
    } else {
      dispatch(setSmart(false))
    }
  }
  const checkDeviceWithWidth = () => {
     setTimeout(() => {
      if(window.innerWidth <= 1370){
         dispatch(setSmart(true))
      } else {
         dispatch(setSmart(false))
      }
     },300)
  }
  const GetSomeData = () =>  {
   if(lang && SmartDevice == null){
       checkDeviceWithWidth()
     }
  }
  const ListPosition = () => {
    if(router.asPath && SmartDevice != null){
      const currentPathPage = router.asPath.split('#')[1]
      switch(currentPathPage){
         case "":
           !SmartDevice ? setlistLeft(DownloadRef.current.offsetLeft) : setlistLeft(DownloadRef.current.offsetTop);
           dispatch(setActivePage(""))
            break;
         case "news":
          !SmartDevice ? setlistLeft(NewsRef.current.offsetLeft) : setlistLeft(NewsRef.current.offsetTop);
          dispatch(setActivePage("news"))
            break;
         case "locations":
            !SmartDevice ? setlistLeft(LocationsRef.current.offsetLeft) : setlistLeft(LocationsRef.current.offsetTop);
            dispatch(setActivePage("locations"))
             break;
         case "characters":
            !SmartDevice ? setlistLeft(CharactersRef.current.offsetLeft) : setlistLeft(CharactersRef.current.offsetTop);
            dispatch(setActivePage("characters"))
        default:
          break;
      }
    } else {
      return
    }
  }
  const GlobalWindowCheck = () => {
     checkWindowSize()
     checkWindowOrientation()
     ListPosition()
  }
  const ChangeRoute = (Index:number) => {
     if(!canScroll){
        return
     } else {
      if(router.asPath.split('#')[1] !== `#${pages[index]}`){
         router.push(`#${pages[Index]}`).then(() => {
            CallsCount.current = 0
         }).catch((err:any) => {
            console.error("SOSI HUI CHMO",err)
         })
       }
     }
  }
  useEffect(() => {
   ListPosition()

    
    window.addEventListener("resize",GlobalWindowCheck)

    return () => {
      window.removeEventListener("resize",GlobalWindowCheck)
    }
  },[router.asPath,orientation,SmartDevice])
  useEffect(() => {
        GetSomeData()
  },[lang,Events,Locations])
  useEffect(() => {
       if(!lang && router.query){
         const language = router.query.language
         setLang(language)
         dispatch(setLanguage(language))
        }
  },[lang,router])
  useEffect(() => {
      setIndex(pages.indexOf(activePage))
      setcatchIndex(true)
  },[activePage])
  useEffect(() => {
    const touchStart = (event:TouchEvent) => {
        if(canScroll || !videoPlay || AllowPageSlide){
          const touch = event.touches[0]
          setfirstTouch(touch.clientY)
          setmouseMove(touch.clientY)
        } else {
           return
        }
    }
   //  const touchMove = (event:TouchEvent) => {
   //     event.preventDefault()
   //      if(!draged || videoPlay || !canScroll){
   //         return
   //      } else {
   //        const touch = event.touches[0]
   //        const currentPos =  orientation == "landscape" ? touch.clientX : touch.clientY
   //        const amplitude = mouseMove - currentPos
   //        if(amplitude > 0){
   //           setlistLeft(value => Math.min(value + amplitude,PagesList.current.offsetHeight * pages.length))
   //        } else if(amplitude < 0){
   //           setlistLeft(value => Math.max(value + amplitude,0))
   //        }

   //        setmouseMove(currentPos)
   //      }
   //  }
    const touchEnd = (event:TouchEvent) => {
        if(videoPlay || !canScroll || !AllowPageSlide){
          return
        } else {
          const touch = event.changedTouches[0]
          const endTouch = touch.clientY
          const amplitude = Math.abs(endTouch - firstTouch)
          let newIndex = 0
          if(amplitude > 30){
            setDraged(true)
            setcanScroll(false)
            if(firstTouch > endTouch && index < pages.length - 1){
               newIndex = index + 1
            } 
            if(firstTouch < endTouch && index > 0){
               newIndex = index - 1
            }
            setIndex(newIndex)
            ChangeRoute(newIndex)
          } else {
            return
          }
        }
    }

    const Scroll = (event:WheelEvent) => {
      let newIndex = 0
        if(!canScroll || videoPlay){
           event.preventDefault()
           return
        } else {
          CallsCount.current += 1
          setcanScroll(false)
           if(event.deltaY > 0){
              newIndex = index < pages.length - 1 ? index + 1 : index
           }
           if(event.deltaY < 0){
              newIndex = index > 0 ? index - 1 : index
           }
           setIndex(newIndex)        
           if(CallsCount.current <= 1){
             ChangeRoute(newIndex)
           }
        }
    }
    if(lang && router.isReady && SmartDevice != null && catchIndex){
         window.addEventListener("wheel",Scroll,{passive:false})
    }
   
    if(SmartDevice){
       PagesList.current.addEventListener("touchstart",touchStart)
       PagesList.current.addEventListener("touchend",touchEnd)
    }
    
    return () => {
      window.removeEventListener("wheel",Scroll)
      if(PagesList.current){
         PagesList.current.removeEventListener("touchstart",touchStart)
         PagesList.current.removeEventListener("touchend",touchEnd)
      }
    }
  },[canScroll,index,videoPlay,activePage,SmartDevice,draged,mouseMove,orientation,AllowPageSlide,lang,router,catchIndex])
  useEffect(() => {
       if(draged){
         setTimeout(() => {
             setDraged(false)
         },400)
       }
  },[draged])
  useEffect(() => {
        if(draged){
           setsmartTransition(true)
        } else {
           setsmartTransition(false)
        }
  },[draged])
  useEffect(() => {
     if(!canScroll){
     timer = setTimeout(() => {
        setcanScroll(true)
      },1000)
     } else {
        clearTimeout(timer)
     }
  },[canScroll,timer])
  useEffect(() => {
        if(!orientation){
           checkWindowOrientation()
        }
  },[orientation])
  return(
    <>
      <Head>
         <title>{GetTitleText(activePage,lang)}</title>
      </Head>
      <Navigation/>
      {SmartDevice == null && <div className="await-width-bg"><LoadingDataSection/></div>}
      <main ref={PagesList} >
        <div className="container" data-slide-container="">
           <ul  style={{transform:SmartDevice ? `translateY(${-listLeft}px)` : `translateX(${-listLeft}px)`,transition:smartTransition ? "all .6s" : "all 0s"}} className="page-slider">
              <li  ref={DownloadRef} className="page-slider-item" data-active-pages={activePage == ""} data-page="main">
                 {!SmartDevice != null && <DownloadPage/>}
              </li>
              <li  ref={NewsRef} className="page-slider-item" data-active-pages={activePage == "news"} data-page="news">
              {!SmartDevice != null && <NewsPage/>}
              </li>
              <li  ref={LocationsRef} className="page-slider-item" data-location-slider data-active-pages={activePage == "locations"} data-page="locations"> 
              {!SmartDevice != null && <LocationsPage/>}
              </li>
              <li  ref={CharactersRef} className="page-slider-item" data-active-pages={activePage == "characters"} data-page="characters">
              {!SmartDevice != null && <CharactersPage/>}
              </li>
           </ul>
        </div>
      </main>
    </>
  )
}



export default MainGlobal
'use client'
import TabSlider from "@/Components/TabSlider"
import { GetLangListText, LangForNav } from "@/LanguageText/GetNavText"
import { GetActivePage, GetButtonSound, GetLanguage, GetSmart, GetVideoPlay } from "@/store/Selectors/globalSelectors"
import { setButtonSound } from "@/store/Slices/AllSubParams"
import { faEarth, faSortDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Span } from "next/dist/trace"
import { useRouter } from "next/router"
import { resolve } from "path"
import { useState,useEffect,useRef, startTransition } from "react"
import { useSelector,useDispatch } from "react-redux"


const Navigation = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [click,setClick] = useState<boolean>(false)
  const [langList,setlangList] = useState<boolean>(false)
  const [navText,setnavText] = useState<string[]>([])
  const navRoutes = ["","news","locations","characters"]
  const [tabSlider,setTabSlider] = useState<boolean | string>("none")
  const activePage = useSelector(GetActivePage)
  const videoPlay = useSelector(GetVideoPlay)
  const buttonSound = useSelector(GetButtonSound)
  const SmartDevice = useSelector(GetSmart)
  const lang = useSelector(GetLanguage)
  const Click = useRef<any>(null)
  const Lang = useRef<any>(null)
  const Tab = useRef<any>(null)
  useEffect(() => {
     startTransition(() => {
        if(lang){
        setnavText(LangForNav(lang))
       }
     })
  },[lang])
  useEffect(() => {
    const buttonAudio = Click.current
     if(click && Click.current || buttonSound){
      buttonAudio.currentTime = 0 
      buttonAudio.play()
      buttonAudio.volume = .05
     } else {
        return
     }
  },[click,buttonSound])
  useEffect(() => {
     if(click){
      setTimeout(() => setClick(false),100)
     }
     if(buttonSound){
       setTimeout(() => dispatch(setButtonSound(false)),100)
     }
  },[click,buttonSound])
  useEffect(() => {
     if(Lang.current){
      const CloseList = (event:MouseEvent) => {
          if(Lang.current && langList && !Lang.current.contains(event.target)){
             setlangList(false)
             setClick(true)
          }
          
      }

        document.addEventListener("mousedown",CloseList)

        return () => document.removeEventListener("mousedown",CloseList)
     }
  },[Lang.current,langList])
  useEffect(() => {
    if(Tab.current){
        const CloseTabSlider = (event:MouseEvent) => {
            if(typeof tabSlider == "boolean" && tabSlider && !Tab.current.contains(event.target)){
               return new Promise((resolve) => {
                  setTimeout(() => {
                     resolve(setTabSlider(false))
                  },200)
               })
            }
        }

        document.addEventListener("mousedown",CloseTabSlider)

        return () => document.removeEventListener("mousedown",CloseTabSlider)
    }
 },[tabSlider])
  const activeRoute = (type:string) => {
     router.push(`#${type}`)
     setClick(true)
  }
  const OpenCloseList = () => {
    setlangList(prev => !prev)
    setClick(true)
  }
  return(
    <>
    <TabSlider active={tabSlider}/>
     <header style={{zIndex: videoPlay ? "0" : "1"}} className="main-header">
      <nav className="main-nav">
        <div ref={Tab} onClick={() => setTabSlider(prev => typeof prev  == 'string' ?  true : !prev)} className="nav-action-tab-slider" data-active-tab-slider={tabSlider}>
            <span className="nav-action-tab-stick"></span>
            <span className="nav-action-tab-stick" data-middle-stick=""></span>
            <span className="nav-action-tab-stick"></span>
        </div>
        <ul className="nav-actions-list">
          {navText.map((nav,index) => (
            <li key={`navigation-item-${index}`} className="nav-action-list-item">
              <div className="nav-action-container">
                <a href={`#${navRoutes[index]}`} onClick={() => activeRoute(navRoutes[index])} className="nav-action" data-active-route={activePage == navRoutes[index]} data-nav-route={index}>{nav}</a>
              </div>
            </li> 
          ))
          }
        </ul>
        <div  className="nav-user-list">
          <div className="container" data-user-container>
            <div ref={Lang} onClick={() => OpenCloseList()} className="user-language-container" data-active-list={langList}>
              <i className="language-icon">
                <FontAwesomeIcon icon={faEarth}/>
              </i>
              <p className="language-text">{GetLangListText(lang)}
              </p>
              <i style={{transform:langList ? "rotate(180deg)" : "rotate(0deg)"}} className="language-list-icon">
                <FontAwesomeIcon icon={faSortDown}/>
              </i>
              <span>
              {langList && <LanguageList/>}
              </span>
            </div>
          </div>
        </div>
      </nav>
     </header>
     <audio ref={Click} src="/buttonSound.mp3"></audio>
    </>
  )
}

const LanguageList = () => {
  const router = useRouter()
  const linkLang = ["uk","en"]
  const langList = ["Українська","English"]

  const ChangeLanguage = (ind:number) => {
      const path = router.asPath.split('#')[1]

      return `/${linkLang[ind]}/main#${path}`
  }
   return(
     <div className="language-list">
      {langList.map((lang,index) => (
         <li className="language-list-item" key={`lang-list-item-${index}`}>
          <div className="container">
             <a className="language-list-link" href={ChangeLanguage(index)}>{lang}</a>
          </div>
         </li>
      ))
      }
     </div>
   )
}

export default Navigation
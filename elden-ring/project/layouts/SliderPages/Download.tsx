import { setVideoPlay } from "@/store/Slices/AllSubParams"
import { IconDefinition, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { faFacebook, faInstagram, faPlaystation, faSteam, faXTwitter, faXbox, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { ScrollAlert } from "@/Components/ScrollAlert"
import { GetDownloadText } from "@/LanguageText/GetDownloadText"
import { TitleText } from "@/types/allTypes"
import { GetLanguage, GetSmart, GetVideoPlay } from "@/store/Selectors/globalSelectors"
import { useEffect, useRef, useState, useTransition } from "react"
import Head from "next/head"
import { GetOGDescriptionText, GetOGTitleText } from "@/LanguageText/GetOGText"
import LoadingSection from "@/Components/LoadingSuspense"


const DownloadPage = () => {
  const dispatch = useDispatch()
  const lang = useSelector(GetLanguage)
  const videoPlay = useSelector(GetVideoPlay)
  const [buyText,setbuyText] = useState<string[] | string>([""])
  const [isPending,startTransition] = useTransition()
  const SmartDevice = useSelector(GetSmart)
  useEffect(() => {
      startTransition(() => {
         setbuyText(GetDownloadText('buy',lang))
      })
  },[lang])
   return(
    <>
     <Head>
       <meta property="og:title" content={GetOGTitleText('main',lang)}/>
       <meta property="og:description" content={GetOGDescriptionText('main',lang)}/>
       <meta property="og:image" content="https://www.cnet.com/a/img/resize/43bf7152f39f90a03df23c97a8a7ebb9a09ea520/hub/2022/02/23/f12a8db7-d99b-4b8d-9b09-d84f12661cf7/elden-ring-plakat.jpg?auto=webp&fit=bounds&height=1200&precrop=571,571,x357,y149&width=1200" />
     </Head>
    {videoPlay && <TrailerSection/>}
    {lang &&  <ScrollAlert text={GetDownloadText(SmartDevice ? "smart-alert" : "alert",lang)}/>}
     <div className="page-section">
       <div className="buy-section">
       <div className="container" data-main-container>
         <div className="container" data-logo>
         <img className="game-logo" src="/logo.png" alt="Elden-ring" />
         </div>
         <div className="trailer-container">
             <div onClick={() => dispatch(setVideoPlay(true)) } className="play-button">
                <i className="play-icon">
                  <FontAwesomeIcon icon={faPlay}/>
                </i>
             </div>
         </div>
         <div className="buy-market-places-container">
           <div className="container">
             <ul className="buy-list">
                 {buyText && 
                   <>
                   <BuySection icon={faSteam} text={buyText[0]} link="https://store.steampowered.com/agecheck/app/1245620/"/>
                   <BuySection icon={faXbox} text={buyText[1]} link="https://www.xbox.com/ru-RU/games/store/elden-ring/9P3J32CTXLRZ"/>
                   <BuySection icon={faPlaystation} text={buyText[2]} link="https://www.playstation.com/uk-ua/games/elden-ring/"/>
                   </>
                 }
             </ul>
           </div>
         </div>
         <div className="society-container">
              <ul className="society-list">
                 <SocietyIcon icon={faXTwitter}/>
                 <SocietyIcon icon={faFacebook}/>
                 <SocietyIcon icon={faInstagram}/>
                 <SocietyIcon icon={faYoutube}/>
              </ul>
         </div>
       </div>
       </div>
     </div>
     </>
   )
}

const SocietyIcon = ({icon}:{icon:IconDefinition}) => {
    return(
      <li className="society-item">
        <i className="society-icon">
          <FontAwesomeIcon icon={icon}/>
        </i>
      </li>
    )
}

const BuySection = ({icon,text,link}:{icon:IconDefinition,text:string,link:string}) => {
  return(
    <li className="buy-item">
      <a href={link}  target="_blank" className="container" data-link-container="">
        <div className="buy-icon-section">
          <i className="buy-icon">
            <FontAwesomeIcon icon={icon}/>
          </i>
        </div>
        <div className="buy-text-section">
          <p className="buy-text">{text}</p>
        </div>
      </a>
    </li>
  )
}

const TrailerSection = () => {
  const dispatch = useDispatch()
  const [frameLoad,setframeLoad] = useState<boolean>(true)
  const Video = useRef<any>(null)
  useEffect(() => {
     if(Video.current){
        Video.current.onload = () => setframeLoad(false)
     }
  },[Video])
   return(
    <>
    <div onClick={() => dispatch(setVideoPlay(false)) } className="video-bg">
    <div className="video-container">
        <div className="trailer-video">
        {frameLoad && <LoadingSection/>}
        <iframe ref={Video} style={{border:"none",outline:"none"}} className="container"
         src="https://www.youtube.com/embed/E3Huy2cdih0?autoplay=1&mute=1" 
        allow="autoplay; encrypted-media">
        </iframe>
        </div>
     </div>
     <span onClick={() => dispatch(setVideoPlay(false))} className="video-close"></span>
    </div>
     </>
   )
}

export default DownloadPage
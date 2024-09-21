import { useState,useEffect,useRef, startTransition } from "react"
import { useDispatch,useSelector } from "react-redux"
import { GetLocations,GetLanguage, GetWindowSize, GetSmart, GetOrientation, GetActivePage } from "@/store/Selectors/globalSelectors"
import { setAllowPageSlide, setButtonSound } from "@/store/Slices/AllSubParams"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons"
import { GetLocationHeaderText } from "@/LanguageText/GetLocationsText"
import Head from "next/head"
import { GetOGDescriptionText, GetOGTitleText } from "@/LanguageText/GetOGText"
import { GetCurrentLocations } from "@/store/ApiFunctions/GlobalFunctions"
import AlertPage from "@/Components/LocationsAlert"
const LocationsPage = () => {
  const dispatch = useDispatch()
  const Locations = useSelector(GetLocations)
  const lang = useSelector(GetLanguage)
  const SmartDevice = useSelector(GetSmart)
  const activePage = useSelector(GetActivePage)
  const orientation = useSelector(GetOrientation)
  const LocationsList = useRef<any>(null)
  const [slide,setSlide] = useState<number>(0)
  const [listPos,setlistPos] = useState<number>(0) 
  const [drag,setDrag] = useState<boolean>(false)
  const [firstTouch,setfirstTouch] = useState<number>(0)
  const [mouseMove,setmouseMove] = useState<number>(0)
  const [dragMove,setdragMove] = useState<number>(0)
  const [canSwap,setcanSwap] = useState<boolean>(false)
  const [showAlert,setshowAlert] = useState<boolean>(true)
  const ChangeSlide = (num:number,type:string) => {
    if(type == "button"){
      dispatch(setButtonSound(true))
    }
     setSlide(num)
     setlistPos(LocationsList.current.offsetWidth * num)
  }

  const StandOnSlide = () => {
      setlistPos(LocationsList.current.offsetWidth * slide)
  }
  useEffect(() => {
     if(!Locations.length && lang){
        startTransition(() => {
          dispatch(GetCurrentLocations(lang))
        })
     }
  },[lang])
  useEffect(() => {
     console.log("ORI:",orientation)
  },[orientation])
  useEffect(() => {
     if(showAlert && activePage == "locations"){
        setTimeout(() => {
            setshowAlert(false)
        },5000)
     }
  },[showAlert,activePage])
  useEffect(() => {
      const StartDrag = (event:MouseEvent) => {
          setDrag(true)
          setfirstTouch(event.clientX)
          setmouseMove(event.clientX)
      }
      const touchStart = (event:TouchEvent) => {
          const touch = event.touches[0]
          setDrag(true)
          setfirstTouch(touch.clientX)
          setmouseMove(touch.clientX)
      }
      const touchMove = (event:TouchEvent) => {
         if(!drag){
            event.preventDefault()
            return
         } else {
            const touch = event.touches[0]
            const currentPos = touch.clientX
            const amplitude = mouseMove - currentPos

            if(amplitude > 0){
               setlistPos(value => Math.min(value + amplitude,LocationsList.current.offsetWidth * Locations.length))
            } else if (amplitude < 0){
               setlistPos(value => Math.max(value + amplitude,0))
            }
            
            setmouseMove(currentPos)
            setdragMove(value => value + amplitude)

            if(Math.abs(dragMove) > 100){
               dispatch(setAllowPageSlide(false))
            }
         }
      }
      const touchEnd = (event:TouchEvent) => {
         const touch = event.changedTouches[0]
         const endDrag = touch.clientX
         const amplitude = Math.abs(endDrag - firstTouch)
         let newIndex = 0
         setDrag(false)
         setdragMove(0)
         if(amplitude > 20){
            setcanSwap(false)
            if(firstTouch > endDrag && slide < Locations.length - 1){
               newIndex = slide + 1
            }
            if(firstTouch < endDrag && slide > 0){
               newIndex = slide - 1
            }


          ChangeSlide(newIndex,"slide")
         } else{
             setDrag(false)
             setdragMove(0)
             ChangeSlide(slide,"slide")
             setcanSwap(true)
         }

         dispatch(setAllowPageSlide(true))
      }
      const DragMove = (event:MouseEvent) => {
          if(!drag){
             event.preventDefault()
             return
          } else {
             const currentPos = event.clientX
             const amplitude = mouseMove - currentPos

             if(amplitude > 0){
               
                setlistPos(value => Math.min(value + amplitude,LocationsList.current.offsetWidth * Locations.length))
             } else if (amplitude < 0){
                setlistPos(value => Math.max(value + amplitude,0))
             }
             
             setdragMove(value => value + amplitude)
             setmouseMove(event.clientX)

             if(Math.abs(dragMove) > 70){
               dispatch(setAllowPageSlide(false))
             }
          }
      }

      const DragEnd = (event:MouseEvent) => {
          const endDrag = event.clientX
          let newIndex = 0
          setDrag(false)
         const amplitude = Math.abs(endDrag - firstTouch)

         if(amplitude > 20){
            setcanSwap(false)
            if(firstTouch > endDrag && slide < Locations.length - 1){
               newIndex = slide + 1
            }
            if(firstTouch < endDrag && slide > 0){
               newIndex = slide - 1
            }

            ChangeSlide(newIndex,"slide")
         } else {
             setcanSwap(true)
             ChangeSlide(slide,"slide")
         }

          dispatch(setAllowPageSlide(true))
       }

       if(LocationsList.current){
         LocationsList.current.addEventListener("mousedown",StartDrag)
         LocationsList.current.addEventListener("touchstart",touchStart)
       }

       if(drag){
         window.addEventListener("mousemove",DragMove)
         window.addEventListener("mouseup",DragEnd)
       }
       if(drag && SmartDevice){
          window.addEventListener("touchmove",touchMove)
          window.addEventListener("touchend",touchEnd)
       }

       return () => {
         if(LocationsList.current){
          LocationsList.current.removeEventListener("mousedown",StartDrag)
         }
          window.removeEventListener("mousemove",DragMove)
          window.removeEventListener("mouseup",DragEnd)
          window.removeEventListener("touchmove",touchMove)
          window.removeEventListener("touchend",touchEnd)
       }
  },[drag,slide,listPos,Locations,LocationsList,SmartDevice,dragMove])
  useEffect(() => {
   window.addEventListener("resize",StandOnSlide)

   return () => window.removeEventListener("resize",StandOnSlide)
  },[slide])
   return(
     <>
     <Head>
       <meta property="og:title" content={GetOGTitleText('locations',lang)}/>
       <meta property="og:description" content={GetOGDescriptionText('locations',lang)}/>
       <meta property="og:image" content="https://www.cnet.com/a/img/resize/43bf7152f39f90a03df23c97a8a7ebb9a09ea520/hub/2022/02/23/f12a8db7-d99b-4b8d-9b09-d84f12661cf7/elden-ring-plakat.jpg?auto=webp&fit=bounds&height=1200&precrop=571,571,x357,y149&width=1200" />
     </Head>
     <div className="container" data-location-container="">
        <div className="locations-header">
          <div className="container">
             <p className="locations-header-text">{GetLocationHeaderText(lang)}</p>
          </div>
        </div>
        <div className="locations-main">
           <ul style={{transform:`translateX(-${listPos}px)`,transition: !drag ? "all .2s" : "all 0s"}} ref={LocationsList} className="location-slider">
            {Locations.length && 
             Locations.map((location:any,index:number) => (
               <Location key={`location-slider-item-${index}`} image={location.location_image} name={location.location_name} text={location.location_text} active={slide == index} canSwap={canSwap}/>
             ))
            }
           </ul>
           {showAlert && orientation == "portrait" && <AlertPage key={activePage} />}
           <div className="location-slider-button-container" data-left-slider-button="">
             <button onClick={() => ChangeSlide(slide > 0 ? slide - 1 : slide,"button")} className="slider-button">
              <FontAwesomeIcon icon={faChevronLeft}/>
             </button>
           </div>
           <div className="location-slider-button-container" data-right-slider-button="">
             <button onClick={() => ChangeSlide(slide < Locations.length - 1 ? slide + 1 : 0,"button")}  className="slider-button">
             <FontAwesomeIcon icon={faChevronRight}/>
             </button>
           </div>
        </div>
     </div>
    </>
   )
}

export const Location = ({image,name,text,active,canSwap}:{image:string,name:string,text:string,active:boolean,canSwap:boolean}) => {
   const SmartDevice = useSelector(GetSmart)
   const orientation = useSelector(GetOrientation)
   const [whatShow,setwhatShow] = useState<string>("image")
   useEffect(() => {
      if(!active){
          setwhatShow("image")
      }
   },[active])


   const SwapSliderContent = () => {
       return  canSwap && setwhatShow(value => value == "image" ? "text" : "image")
   }
   return(
     <li className={!active ? "location-slider-item location-slider-nonActive" :"location-slider-item"}>
        <div className="container">
         { orientation == "landscape" ?
           <>
            <div className="slider-item-block">
               <img key={`slider-image-active-{${active}}`}  className="slider-item-image slider-item-image-defaultActive" src={`/${image}.png`} alt={`${name}- in - game`} />
            </div>
            <div className="slider-item-block" data-text-block="">
               <div className="slider-item-text-container">
               <i key={`slider-name-active-{${active}}`}  className="slider-item-name">{name}</i>
               <p key={`slider-text-active-{${active}}`}  className="slider-item-text slider-item-text-defaultActive">{text}</p>
            </div>
            </div>
           </>
           : 
           <>
           <div  onClick={() => SwapSliderContent() } className="container" data-location-item-container="">
              <i key={`slider-name-active-{${active}}`} className="slider-item-name">{name}</i>
              <img className={whatShow == "image" && active ? "slider-item-image slider-item-image-Active" : "slider-item-image slider-item-image-nonActive"} src={`/${image}.png`} alt={`${name}- in - game`}  />
              <p className={whatShow == "text" ? "slider-item-text slider-item-text-Active" : "slider-item-text slider-item-text-nonActive"}>{text}</p>
           </div>
           </>

         }
        </div>
     </li>
   )
}

export default LocationsPage

import { GetOGDescriptionText, GetOGTitleText } from "@/LanguageText/GetOGText"
import { GetCurrentCharacters } from "@/store/ApiFunctions/GlobalFunctions"
import { GetCharacters, GetLanguage, GetOrientation, GetSmart, GetWindowSize } from "@/store/Selectors/globalSelectors"
import { setAllowPageSlide, setButtonSound } from "@/store/Slices/AllSubParams"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from "next/head"
import { startTransition, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Pangolin } from "next/font/google"

const pangolin = Pangolin({weight:'400',subsets:['latin-ext','latin']})

const CharactersPage = () => {
  const dispatch = useDispatch()
  const lang = useSelector(GetLanguage)
  const characters = useSelector(GetCharacters)
  const SmartDevice = useSelector(GetSmart)
  const [slideIndex,setslideIndex] =  useState<number>(0)
  const [sliderPos,setslidePos] = useState<number>(0)
  const [dragMoved,setdragMoved] = useState<number>(0)
  const [drag,setDrag] = useState<boolean>(false)
  const [firstTouch,setfirstTouch] = useState<number>(0)
  const [mouseMove,setmouseMove] = useState<number>(0)
  const CharactersList = useRef<any>(null)
  const ChangeSlide = (num:number,type:string) => {
     if(type == "button"){
       dispatch(setButtonSound(true))
     }
     setslideIndex(num)
     setslidePos((CharactersList.current.offsetHeight / characters.length) * num)
  }
  const StandOnSlide = () => {
     if(CharactersList.current){
      setslidePos((CharactersList.current.offsetHeight / characters.length) * slideIndex)
     }
  }
  
  useEffect(() => {
     const StartDrag = (event:MouseEvent) => {
         setfirstTouch(event.clientY)
         setDrag(true)
         setmouseMove(event.clientY)
     }
    const touchStart = (event:TouchEvent) => {
        const touch = event.touches[0]
        setfirstTouch(touch.clientY)
        setDrag(true)
        setmouseMove(touch.clientY)
    }
    const touchMove = (event:TouchEvent) => {
        if(!drag){
           return
        } else {
           const touch = event.touches[0]
           const currentPos = touch.clientY
           const amplitude = mouseMove - currentPos
           if(amplitude > 0){
               setslidePos(value => Math.min(value + amplitude,CharactersList.current.offsetHeight))
           } else if(amplitude < 0){
               setslidePos(value => Math.max(value + amplitude,0))
           }
           setmouseMove(currentPos)
           setdragMoved(value => value + amplitude)
           if(Math.abs(dragMoved) > 70){
            dispatch(setAllowPageSlide(false))
           }
        }
    }
    const touchEnd = (event:TouchEvent) => {
      const touch = event.changedTouches[0]
      const endDrag = touch.clientY
      let newIndex = 0
      setDrag(false)
      setdragMoved(0)
      if(firstTouch > endDrag && slideIndex < characters.length - 1){
         newIndex = slideIndex + 1
      } else if(firstTouch < endDrag && slideIndex > 0){
         newIndex = slideIndex - 1
      }

      ChangeSlide(newIndex,"slide")
      dispatch(setAllowPageSlide(true))
    }
     const StartMove = (event:MouseEvent) => {
         if(!drag){
            event.preventDefault()
            return
         } else {
            const currentPos = event.clientY
            const amplitude = mouseMove - currentPos

            if(amplitude > 0){
                setslidePos(value => Math.min(value + amplitude,CharactersList.current.offsetHeight))
            } else if(amplitude < 0){
                setslidePos(value => Math.max(value + amplitude,0))
            }

            setmouseMove(event.clientY)
         }
     }

     const EndDrag = (event:MouseEvent) => {
         const endDrag = event.clientY
         let newIndex = 0
         setDrag(false)
         if(firstTouch > endDrag && slideIndex < characters.length - 1){
            newIndex = slideIndex + 1
         } else if(firstTouch < endDrag && slideIndex > 0){
            newIndex = slideIndex - 1
         }

         ChangeSlide(newIndex,"slide")
         dispatch(setAllowPageSlide(true))
     }
     
     if(CharactersList.current){
        CharactersList.current.addEventListener("mousedown",StartDrag)
        CharactersList.current.addEventListener("touchstart",touchStart)
     }

     if(drag){
        window.addEventListener("mousemove",StartMove,{passive:false})
        window.addEventListener("mouseup",EndDrag)
     }
     if(drag && SmartDevice){
        window.addEventListener("touchmove",touchMove)
        window.addEventListener("touchend",touchEnd)
     }


     return () => {
        if(CharactersList.current){
          CharactersList.current.removeEventListener("mousedown",StartDrag)
          CharactersList.current.removeEventListener("touchstart",touchStart)
        }
          window.removeEventListener("mousemove",StartMove)
          window.removeEventListener("mouseup",EndDrag)
          window.removeEventListener("touchmove",touchMove)
          window.removeEventListener("touchend",touchEnd)
     }

  },[drag,sliderPos,slideIndex,CharactersList,SmartDevice,dragMoved])
  useEffect(() => {
    if(lang && !characters.length){
       startTransition(() => {
         dispatch(GetCurrentCharacters(lang))
       })
    }
  },[lang,characters])
  useEffect(() => {
   window.addEventListener("resize",StandOnSlide)

   return () => window.removeEventListener("resize",StandOnSlide)
  },[slideIndex])
    return(
      <>
      <Head>
       <meta property="og:title" content={GetOGTitleText('characters',lang)}/>
       <meta property="og:description" content={GetOGDescriptionText('characters',lang)}/>
       <meta property="og:image" content="https://www.cnet.com/a/img/resize/43bf7152f39f90a03df23c97a8a7ebb9a09ea520/hub/2022/02/23/f12a8db7-d99b-4b8d-9b09-d84f12661cf7/elden-ring-plakat.jpg?auto=webp&fit=bounds&height=1200&precrop=571,571,x357,y149&width=1200" />
      </Head>
       <div className="page-section">
          <div className="container" data-characters-container="">
              <ul style={{transform:`translateY(${-sliderPos}px)`,transition: drag ? "all 0s" : "all .2s"}} ref={CharactersList} className="character-slider">
                 { characters.length && characters.map((character:any,index:number) => (
                   <CharacterSlide key={`character-slide-${index}`} name={character.character_name} text={character.character_description} image={character.character_image} active={index == slideIndex} />
                 ))
                 }
              </ul>
              <div className="slider-buttons-section">
                <button onClick={() => ChangeSlide(slideIndex > 0 ? slideIndex - 1 : characters.length - 1,"button")} className="character-slider-button">
                  <FontAwesomeIcon icon={faChevronUp}/>
                </button>
                <button onClick={() => ChangeSlide(slideIndex < characters.length - 1 ? slideIndex + 1 : 0,"button")} className="character-slider-button">
                  <FontAwesomeIcon icon={faChevronDown}/>
                </button>
             </div>
          </div>
       </div>
     </>
    )
}

const CharacterSlide = ({name,text,image,active}:{name:string,text:string,image:string,active:boolean}) => {
   const orientation = useSelector(GetOrientation)

    return(
       <li className={active ? "character-slider-item" : "character-slider-item character-slider-item-nonActive"}>
         <div className="container" data-character-slider-item-container={orientation == "portrait"}>
          { orientation == "portrait" ? 
               <>
                  <p className="character-slider-item-name">{name}</p>
                 <div className="character-slider-item-block" data-character-portrait="">
                 <img className="character-slider-item-image" src={`/${image}.webp`} alt={name} />
                 </div>
                 <div className="character-slider-text-container">
                 <p style={{fontFamily:`${pangolin.style.fontFamily}`}} className="character-slider-item-text">{text}</p>
                 </div>
               </>
                :
            <>
            <div className="slider-item-block">
              <img className="character-slider-item-image" src={`/${image}.webp`} alt={name} />
             </div>
             <div className="character-slider-item-block">
               <div className="character-slider-text-container">
                  <p className="character-slider-item-name">{name}</p>
                  <p style={{fontFamily:`${pangolin.style.fontFamily}`}} className="character-slider-item-text">{text}</p>
               </div>
             </div>
            </>
         }
         </div>
       </li>
    )
}

export default CharactersPage
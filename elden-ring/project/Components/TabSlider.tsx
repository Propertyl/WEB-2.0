import { GetActivePage } from "@/store/Selectors/globalSelectors"
import { setActivePage } from "@/store/Slices/AllSubParams"
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

const TabSlider = ({active}:{active:boolean | string}) => {
    return(
       <div   className="tab-slider" data-tab-slider-active={active}>
         <div className="container" data-tab-container="">
            <div className="tab-slider-logo-container">
               <img className="tab-slider-logo" src="/logo.png" alt="logo" />
            </div>
            <ul className="tab-slider-links">
                <TabItem link="" name="Головна"/>
                <TabItem link="news" name="Новини"/>
                <TabItem link="locations" name="Локації"/>
                <TabItem link="characters" name="Персонажі"/>
            </ul>
            <ul className="tab-slider-societys">
                <SocietyItem icon={faXTwitter}/>
                <SocietyItem icon={faFacebook}/>
                <SocietyItem icon={faInstagram}/>
                <SocietyItem icon={faYoutube}/>
            </ul>
         </div>
       </div>
    )
}

const TabItem = ({link,name}:{link:string,name:string}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const activePage = useSelector(GetActivePage)

  const changeSlide = () => {
    router.push(`#${link}`)
    dispatch(setActivePage(link))
  }
    return(
       <li className="tab-slider-link" onClick={() => changeSlide()} data-active-tab-item={activePage == link}>
        <div className="container" data-link-container="">
           <p className="tab-slider-link-text">{name}</p>
        </div>
       </li>
    )
}

const SocietyItem = ({icon}:{icon:IconDefinition}) => {
   return(
      <li className="tab-slider-society">
         <i className="society-icon">
            <FontAwesomeIcon icon={icon}/>
         </i>
      </li>
   )
}

export default TabSlider
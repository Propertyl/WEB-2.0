import { TitleText } from "@/types/allTypes"

const OGTitleText = {
   'main':{
     'uk':"Головна",
     'en':"Main"
   },
   'news':{
     'uk':'Новини',
     'en':'News'
   },
   'locations':{
     'uk':'Локації',
     'en':'Locations'
   },
   'characters':{
     'uk':'Персонажі',
     'en':'Characters'
   }
}

const OGDescriptionText = {
   'main':{
     'uk':"Придбати гру Elden Ring",
     'en':'Purchace game Elden Ring'
   },
   'news':{
     'uk':'Основні новини гри Elden Ring',
     'en':'Main news of game Elden Ring'
   },
   'locations':{
      'uk':'Основні локації гри Elden Ring',
      'en':'Main locations of game Elden Ring'
   },
   'characters':{
      'uk':'Персонажі гри Elden Ring',
      'en':'Characters of game Elden Ring'
   }
}

export const GetOGDescriptionText = (type:keyof typeof OGDescriptionText,lang:keyof TitleText) => {
   const OGDescriptionType = OGDescriptionText[type]

   return OGDescriptionType[lang]
}

export const GetOGTitleText = (type:keyof typeof OGTitleText,lang:keyof TitleText) => {
   const OGTitleType = OGTitleText[type]

   return OGTitleType[lang]
}
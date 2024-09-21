import { TitleText } from "@/types/allTypes"

const TitleList = {
   "":{
    'uk':"Придбання Elden Ring",
    'en':"Purchase Elden Ring"
   },
   "news":{
    'uk':"Новини",
    "en":"News"
   },
   "locations":{
      'uk':"Основні локації",
      'en':"Main locations"
   },
   "characters":{
      'uk':"Персонажі",
      "en":"Characters"
   }
}


export const GetTitleText = (type:keyof typeof TitleList,lang:keyof TitleText) => {
   const currentTitle = TitleList[type]

   return currentTitle[lang]
}
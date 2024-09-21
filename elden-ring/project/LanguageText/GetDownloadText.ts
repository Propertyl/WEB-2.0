import { TitleText } from "@/types/allTypes"

const DownloadPageText = {
   'alert':{
      'uk':"Прокручуй",
      'en':"Scroll"
   },
   'smart-alert':{
      'uk':'Гортай до низу',
      "en":'Slide to down'
   },
   'buy':{
    'uk':['Придбати у Steam','Придбати у Xbox','Придбати у Playstation Store'],
    'en':['Purschace in Steam','Purschace in Xbox','Purschace in Playstation Store']
   }
}




export const GetDownloadText = (type:keyof typeof DownloadPageText,lang:keyof TitleText) => {
    const currentBlock = DownloadPageText[type]

    return currentBlock[lang]
}
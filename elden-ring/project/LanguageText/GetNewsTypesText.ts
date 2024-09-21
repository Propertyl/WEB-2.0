const TypesText = {
  'uk':["Всі","Оновлення","Повідомлення"],
  "en":["All","Updates","Notice"]
}

const TypesTranslate = {
  "Updates":"Оновлення",
  "Notice":"Повідомлення"
}

const GetTypesText = (lang:keyof typeof TypesText) => {
   
   return TypesText[lang]
}

export const GetDetailTypes = (type:keyof typeof TypesTranslate,lang:keyof typeof TypesText) => {
    if(lang == "uk"){
       return TypesTranslate[type]
    }
    if(lang == "en"){
       return type
    }
}

export default GetTypesText
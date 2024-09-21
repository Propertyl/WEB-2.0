
const NavButtonsText = {
  'uk':["Головна","Новини","Локації","Персонажі"],
  'en':["Home","News","Locations","Characters"]
}

const LangListText = {
  'uk':["Обрати мову"],
  "en":["Choose Language"]
}

export const GetLangListText = (lang:keyof typeof LangListText) => {
   return LangListText[lang]
}

export const LangForNav = (lang:keyof typeof NavButtonsText) => {
    return NavButtonsText[lang]
}

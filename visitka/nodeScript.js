const Phrases = {
  "0": "Далі або Завершити",
  "any":"Далі або Назад",
  [document.body.childElementCount - 1]:"Назад або Завершити"
}

const GetPhrase = (nodeNumber) => {
   if(nodeNumber > 0 && nodeNumber < document.body.childElementCount - 1){
       return Phrases["any"]
   }

   return Phrases[nodeNumber]
}


const DOMNodeShower = (nodeNumber) => {
   const body = document.body
   const node = body.children[nodeNumber]
   const nodeHTML = node.outerHTML
   const phrase = GetPhrase(nodeNumber)
   const keys = phrase.split(" ")
   const answer = prompt(`Вузел ${nodeNumber} : \n ${nodeHTML} \n ${phrase}`).toLowerCase()

   if(keys.find((key) => answer == key.toLowerCase())){
     switch(answer){
       case "далі": 
         DOMNodeShower(nodeNumber + 1)
       break;
       case "назад":
         DOMNodeShower(nodeNumber - 1)
       break;
       case "завершити":
         return 0
       default:
         return console.log("Невірна команда!")        
     }
   } else {
     alert("Дана команда не працює")
   }
}

DOMNodeShower(0)
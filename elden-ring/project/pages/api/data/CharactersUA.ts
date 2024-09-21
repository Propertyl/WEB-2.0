import { NextApiRequest, NextApiResponse } from "next"

const CharactersUA = {
  character_id:[1,2,3,4,5,6,7,8,9,10],
  character_name:["Самурай","Мерзотник","Пророк","Духовник","Астролог","Бандит","В'язень","Волоцюга","Воїн","Герой"],
  character_description:["Здатний боєць із далеких країн. Добре володіє катаною та довгим луком.","Безрідне, неприкаяне створіння, що не має жодного гроша за душею.","Одного разу вигнаний через зловісні ознаки, пророк, що спеціалізується на лікувальної магії.","Сповідник церковний шпигун, фахівець із секретних операцій. Майстерно володіє мечем і заклинаннями.","Вчений, що читає долю за зірками. Спадкоємець школи Каміння, що світиться.","Бандит б'є по слабких місцях і має перевагу в дальньому бою завдяки луку.","Ув'язнений у залізній масці. Вивчав чаклунство школи Каміння, що Світиться. До винесення вироку жив серед еліти.","Лицар у важкій броні, вигнаний з батьківщини, і тепер блукає.","Воїн-кочівник, який бореться двома мечами одночасно. Має виняткові техніки бою.","Стійкий герой із бойовою сокирою, нащадок отамана пустки."],
  character_image:["samurai","wretch","prophet","confessor","astrologer","bandit","prisoner","vagabond","warrior","hero"]
}



const GetCharactersInfo = async (req:NextApiRequest,res:NextApiResponse) => {
  const CharactersData = CharactersUA.character_id.map((id,index) => (
     { 
      character_id:id,
      character_name:CharactersUA.character_name[index],
      character_description:CharactersUA.character_description[index],
      character_image:CharactersUA.character_image[index]
     }
  ))
 
  res.setHeader("Content-Type",'application/json')
  res.status(200).json(CharactersData)
}

export default GetCharactersInfo
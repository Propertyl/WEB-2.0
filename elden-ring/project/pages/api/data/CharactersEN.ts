import { NextApiRequest, NextApiResponse } from "next"

const CharactersEN = {
  character_id:[1,2,3,4,5,6,7,8,9,10],
  character_name:["Samurai","Wretch","Prophet","Confessor","Astrologer","Bandit","Prisoner","Vagabond","Warrior","Hero"],
  character_description:["A capable fighter from distant lands. He is proficient with a katana and longbow.","A rootless, restless creature, without a penny to his name.","Once exiled due to dire omens, a prophet who specializes in healing magic.","Confessor is a church spy, a specialist in secret operations. Skillfully wields a sword and spells.","A scientist who reads fate by the stars. Heir to the School of Glowing Stone.","The Bandit hits weak points and has superior ranged combat thanks to his bow.","Prisoner in an iron mask. He studied the witchcraft of the Glowing Stone School. Before the verdict, he lived among the elite.","A heavily armored knight, exiled from his homeland and now wandering.","A nomadic warrior who fights with two blades at the same time. Possesses exceptional fighting techniques.","A stalwart hero with a battle axe, descendant of the ataman of the wasteland."],
  character_image:["samurai","wretch","prophet","confessor","astrologer","bandit","prisoner","vagabond","warrior","hero"]
}



const GetCharactersInfo = async (req:NextApiRequest,res:NextApiResponse) => {
  const CharactersData = CharactersEN.character_id.map((id,index) => (
     { 
      character_id:id,
      character_name:CharactersEN.character_name[index],
      character_description:CharactersEN.character_description[index],
      character_image:CharactersEN.character_image[index]
     }
  ))
 
  res.setHeader("Content-Type",'application/json')
  res.status(200).json(CharactersData)
}

export default GetCharactersInfo
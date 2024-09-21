import { NextApiRequest, NextApiResponse } from "next"

const LocationsEN = {
  location_id:[1,2,3,4],
  location_name:["Limgrave","Caelid","Liurnia","Mountaintops of the Giants"],
  location_text:["The Grave, an area located far south of the Erd Tree, extends to the northwestern cliffs of the Storm Veil. Under its ever-gloomy skies lie the great steppes.The region includes many basic enemy types that will help players learn the basics of this world. It contains many secrets and enemies.","Caelid are endless blood-red valleys and high deadly cliffs, dangerous poisonous swamps and mysterious ruins. Unprecedented monsters rule here, with dragons sitting at the top of the hierarchy.","The lands of Liurnia, famous for its endless forests and eternal fog, are almost completely flooded.Highways run along the east and west coasts, and the Raya Lucaria Academy rises above the northern part.","The Giantspeak is a remote region in the far north, where the hero finds himself after defeating the current ruler of the continent, Morgoth. Cold and stern, it contains many secrets. Here you can also find the remains of a long-vanished troll empire and dragons lost in a snowstorm; lonely monster-infested outposts and icy underground caves.The Peaks of the Giants hide many secrets."],
  location_image:["grave-bg","star-bg","liurnia-bg","giants-bg"]
}



const GetLocationsInfo = async (req:NextApiRequest,res:NextApiResponse) => {
  const LocationsData = LocationsEN.location_id.map((id,index) => (
     { location_id:id,
       location_name:LocationsEN.location_name[index],
       location_text:LocationsEN.location_text[index],
       location_image:LocationsEN.location_image[index]
     }
  ))
 
  res.setHeader("Content-Type",'application/json')
  res.status(200).json(LocationsData)
}

export default GetLocationsInfo
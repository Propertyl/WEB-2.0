import { NextApiRequest, NextApiResponse } from "next"
export const NewsEN = {
  news_id:[1,2,3,4],
  news_name:["Scheduled Server Maintenance","Warning About Potential Scam Sites","New Weapon Parity System","New Dungeon Added for Exploration"],
  news_text:[" Dear players, we would like to inform you that on September 15, 2024, from 03:00 to 07:00 Kyiv time, scheduled server maintenance will be conducted. During this period, access to the game will be limited. We apologize for any inconvenience this may cause and thank you for your understanding.","Attention, players! We have received reports about fraudulent websites posing as official Elden Ring resources. We strongly advise you to be cautious and always verify the source of information to avoid the risk of losing your account data or access to the game."," In the latest Elden Ring update, a new weapon parity system has been introduced to better balance the game. Players can now experience more equal conditions when using different types of weapons, making combat even more engaging.","Players, get ready for new adventures! The update has added a new dungeon,'Dark Ruins',where new challenges, powerful enemies, and unique items await you. Don't miss the chance to explore this location and earn valuable rewards."],
  news_type:["Notice","Notice","Updates","Updates"],
  news_date:["09.01.2024","08.27.2024","07.15.2024","09.04.2024"]
}

const GetNewsDataEN =  async (req:NextApiRequest,res:NextApiResponse) => {
  const NewsList = NewsEN.news_id.map((id,index) => (
    {
      news_id:id,
      news_name:NewsEN.news_name[index],
      news_text:NewsEN.news_text[index],
      news_type:NewsEN.news_type[index],
      news_date:NewsEN.news_date[index]
    }
  ))
    res.setHeader('Content-Type','application/json')

    res.status(200).json(NewsList)  

}

export default GetNewsDataEN
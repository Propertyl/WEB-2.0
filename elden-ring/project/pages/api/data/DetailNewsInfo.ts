import { NextApiRequest, NextApiResponse } from "next";
import { NewsUA } from "./NewsInfoUA";
import { NewsEN } from "./NewsInfoEN";



const GetCurrentNewsInfo =  async (req:NextApiRequest,res:NextApiResponse) => {
    const {lang,id} = req.body
    
    const NewsData = lang == "uk" ? NewsUA : NewsEN

    const currentNewsIndex:number | any = NewsData.news_id.findIndex((num:number) => num  ==  id )





   res.setHeader('Content-Type','application/json')
    
    if(currentNewsIndex === -1){
      res.status(404).json({error:"Not found"})
    } else {
      const currentNewsInfo = {
        news_id:NewsData.news_id[currentNewsIndex],
        news_name:NewsData.news_name[currentNewsIndex],
        news_text:NewsData.news_text[currentNewsIndex],
        news_type:NewsData.news_type[currentNewsIndex],
        news_date:NewsData.news_date[currentNewsIndex]
      }
      res.status(200).json(currentNewsInfo)
    }
}

export default GetCurrentNewsInfo
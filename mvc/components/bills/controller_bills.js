import Modelbills from "./model_bills.js";
import Viewbills from "./view_bills.js";

export default class Controllerbills{
  constructor(){
     this.model = new Modelbills();
     this.view = new Viewbills();

     this.start();
  }

  start(){
      this.model.loadData().then(d => {
         const allData = this.model.parseData(d)
         this.view.renderData(allData)
      })
  }
}
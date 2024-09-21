import db from "@/db/db"
import { ApiFunc } from "@/types/allTypes"
const ExecuteQuery = (query:string,params:any[] = [],func:ApiFunc) => {
    db.query(query,params,func)
}

export default ExecuteQuery
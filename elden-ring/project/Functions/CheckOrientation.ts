
import { Dispatch } from "redux"

const CheckOrientation = () => {
    if(window.screen.orientation){
        const type = window.screen.orientation.type


        return type.split('-')[0]
    }
}

export default CheckOrientation
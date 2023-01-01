import * as type from "../actionCreators/types";

const SpinnerReducer= (state=false, action)=>{
    switch(action.type){
        case type.hideSpinner:
            return state= false;
        case type.showSpinner:
            return state= true;
        case type.signoutType:
            return false;
        default:
            return state;
        
    }
}

export default SpinnerReducer;
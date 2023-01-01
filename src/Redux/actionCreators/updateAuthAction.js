import * as type from "./types";

export const updateAuthAction= (updatedAuth)=>{
    console.log("inside updated action")
    return (dispatch, getState)=>{
        let auth= getState().auth
        updatedAuth["token"]= auth.token
        dispatch({ type: type.updateAuth, payload: updatedAuth }) 
    }
}
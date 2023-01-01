import * as type from "./types";


export const showSpinner= ()=>{
    return {type: type.showSpinner}
}

export const hideSpinner= ()=>{
    return {type: type.hideSpinner}
}
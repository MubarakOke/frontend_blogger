import { combineReducers } from "redux";
import AccountReducer from "./accountReducer"
import SpinnerReducer from "./spinnerReducer";
import ErrorReducer from "./errorReducer";
import {PostReducer, PublishedPostReducer} from "./postReducer"


export default combineReducers({
  auth: AccountReducer,
  post: PostReducer,
  publishedPost: PublishedPostReducer,
  spinner: SpinnerReducer,
  error: ErrorReducer,
});

import * as type from "./types";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const FetchPostAction = (url, q) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      let uri= "/blog/post-list/"
      if (q){
          uri += `?q=${q}`
      }
      try {
        dispatch(showSpinner())
        const response = await baseApi.get(url || uri,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({ type: type.fetchPost, payload: response.data });
        dispatch(hideSpinner());
      } catch {
        dispatch(hideSpinner());
        toast.error(
          "Cannot get post, please check your internet connection"
        );
      }
    };
  };

  export const FetchPublishedPostAction = (url, q) => {
    return async (dispatch, getState) => {
     
      let uri= "/blog/post-list/publish/"
      let headers={"Content-Type": "application/json"}

      if (q){
          uri += `?q=${q}`
      }
      try {
        dispatch(showSpinner())
        const response = await baseApi.get(url || uri,
          {
            headers
          }
        );
        dispatch({ type: type.fetchPublishedPost, payload: response.data });
        dispatch(hideSpinner());
      } catch {
        dispatch(hideSpinner());
        toast.error(
          "Cannot get published post, please check your internet connection"
        );
      }
    };
  };
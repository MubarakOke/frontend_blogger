import * as type from "../actionCreators/types";

const INITIAL_STATE = null;

export const PostReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.fetchPost:
      return {...action.payload};
    case type.signoutType:
      return {};
    default:
      return state;
  }
};

export const PublishedPostReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.fetchPublishedPost:
      return {...action.payload};
    case type.signoutType:
      return {};
    default:
      return state;
  }
};

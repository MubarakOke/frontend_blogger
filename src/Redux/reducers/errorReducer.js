import * as type from "../actionCreators/types";

const INITIAL_STATE = null;

const ErrorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.errorLogin:
        return action.payload;
    default:
      return state;
  }
};

export default ErrorReducer;
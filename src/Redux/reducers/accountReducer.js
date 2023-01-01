import * as type from "../actionCreators/types";

const INITIAL_STATE = null;

const AccountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.signinType:
      return {...action.payload};
    case type.updateAuth:
      return {...action.payload};
    case type.signoutType:
      return null;
    default:
      return state;
  }
};

export default AccountReducer;

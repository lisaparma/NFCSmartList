import {IAuthentication} from "../action";

export const AuthReducer = (
  state = false,
  action: IAuthentication
) => {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
    default:
      return state;
  }
};
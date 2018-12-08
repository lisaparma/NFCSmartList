//import { Action, Reducer } from "redux";

//import { IStore } from "./IStore";

import {IAuthentication, IInfoAccount} from "./action";


export const reducer = (
  state = {
    auth: false,
  },
  action: IAuthentication | IInfoAccount
) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...state,
        auth: action.auth,
      };
    case 'INFO' :
      return {
        ...state,
        auth: action.auth,
        user: {
          isNewUser: action.user.isNewUser,
          email: action.user.email,
          photoURL: action.user.photoURL,
          phoneNumber: action.user.photoURL,
          displayName: action.user.displayName,
          emailVerified: action.user.emailVerified,
          uid: action.user.uid,
        }
      };
    default:
      return state;
  }
};
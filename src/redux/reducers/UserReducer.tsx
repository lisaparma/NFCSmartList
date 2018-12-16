//import { Action, Reducer } from "redux";

//import { IStore } from "./IStore";

import {IInfoAccount} from "../action";

export const UserReducer = (
  state = {},
  action: IInfoAccount
) => {
  switch (action.type) {
    case 'INFO' :
      return {
        ...state,
        isNewUser: action.isNewUser,
        email: action.email,
        photoURL: action.photoURL,
        phoneNumber: action.photoURL,
        displayName: action.displayName,
        emailVerified: action.emailVerified,
        uid: action.uid
      };
    default:
      return state;
  }
};
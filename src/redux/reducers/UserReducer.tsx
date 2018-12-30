//import { Action, Reducer } from "redux";

//import { IStore } from "./IStore";

import {IInfoAccount, IInfoDevice} from "../action";

export const UserReducer = (
  state = {},
  action: IInfoAccount | IInfoDevice
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
    case "DEVICE_INFO":
      return{
        ...state,
        pixelRatio: action.pixelRatio,
        os: action.os,
        nfc: action.nfc,
      }
    default:
      return state;
  }
};
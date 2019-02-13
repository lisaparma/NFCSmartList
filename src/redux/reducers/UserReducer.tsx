//import { Action, Reducer } from "redux";

//import { IStore } from "./IStore";

import {IAuthentication, IEditAvatar, IEditUsername, IInfo2Account, IInfoAccount, IInfoDevice, IOld} from "../action";

export const UserReducer = (
  state = {},
  action: IInfoAccount | IInfoDevice |IInfo2Account | IEditAvatar |IEditUsername | IOld | IAuthentication
) => {
  switch (action.type) {
    case 'INFO' :
      return {
        ...state,
        isNewUser: action.isNewUser,
        email: action.email,
        uid: action.uid
      };

    case 'INFO2' :
      return {
        ...state,
        username: action.username,
        avatar: action.avatar
      };

    case "DEVICE_INFO":
      return{
        ...state,
        pixelRatio: action.pixelRatio,
        os: action.os,
        nfc: action.nfc,
      };

    case "OLD":
      return{
        ...state,
        isNewUser: false,
      };

    case 'EDIT_USERNAME' :
      return {
        ...state,
        username: action.username,
      };

    case 'EDIT_AVATAR' :
      return {
        ...state,
        avatar: action.avatar,
      };
    case 'LOGOUT':
      return {
        pixelRatio: state.pixelRatio,
        os: state.os,
        nfc: state.nfc,
      };

    default:
      return state;
  }
};
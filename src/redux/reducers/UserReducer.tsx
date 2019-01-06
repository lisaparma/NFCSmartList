//import { Action, Reducer } from "redux";

//import { IStore } from "./IStore";

import {IEditAvatar, IEditUsername, IInfo2Account, IInfoAccount, IInfoDevice} from "../action";

export const UserReducer = (
  state = {},
  action: IInfoAccount | IInfoDevice |IInfo2Account | IEditAvatar |IEditUsername
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
      }

    case 'EDIT_USERNAME' :
      return {
        ...state,
        username: action.username,
      };

    case 'EDIT_AVATAR' :
      return {
        ...state,
        avatar: action.avatar,
      }

    default:
      return state;
  }
};
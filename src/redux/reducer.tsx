//import { Action, Reducer } from "redux";

//import { IStore } from "./IStore";

import {IAddCatalog, IAuthentication, IInfoAccount} from "./action";

export const reducer = (
  state = {
    auth: false,
    user: {},
    catalogs: {},
    friends: {},
  },
  action: IAuthentication | IInfoAccount | IAddCatalog
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
    case 'ADD_CATALOG':
      return {
        ...state,
        catalogs: [...state.catalogs, {id: action.id, name: action.name}],
      }
    default:
      return state;
  }
};
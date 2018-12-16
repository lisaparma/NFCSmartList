//import { Action, Reducer } from "redux";

//import { IStore } from "./IStore";

import {IAddCatalog, IAuthentication, IInfoAccount} from "../action";

export const AuthReducer = (
  state = {
    auth: false,
  },
  action: IAuthentication | IInfoAccount | IAddCatalog
) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...state,
        auth: action.auth,
      };
    // case 'ADD_CATALOG':
    //   return {
    //     ...state,
    //     catalogs: [...state.catalogs, {id: action.id, name: action.name}],
    //   }
    default:
      return state;
  }
};
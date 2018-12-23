import { Action } from "redux";
import {ICatalog, IItem} from "./IStore";

export interface IAuthentication extends Action<'LOGIN' | 'LOGOUT'> {}

export interface IInfoAccount extends Action<'INFO'> {
    isNewUser: boolean;
    email: string;
    photoURL: string | null;
    phoneNumber: string | null;
    displayName: string | null;
    emailVerified: boolean;
    uid: string;
}

export interface IAddCatalog extends Action<'ADD_CATALOG'> {
  id: number;
  name: string;
  class: "standard";
  description: string;
  items?: IItem[];
}

export interface IRemoveCatalog extends Action<'REMOVE_CATALOG'> {
  id: number;
}

export interface IPopulateCatalogs extends Action<'POPULATE_CATALOGS_LIST'> {
  catalogs: ICatalog[];
}
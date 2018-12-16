import { Action } from "redux";
import {ICatalog} from "./IStore";

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
}

export interface IPopulateCatalogs extends Action<'POPULATE_CATALOGS_LIST'> {
  catalogs: ICatalog[];
}
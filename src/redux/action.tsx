import { Action } from "redux";

export interface IAuthentication extends Action<'AUTH'> {
  auth: boolean,
}

export interface IInfoAccount extends Action<'INFO'> {
  auth: boolean,
  user : {
    isNewUser: boolean;
    email: string;
    photoURL: string | null;
    phoneNumber: string | null;
    displayName: string | null;
    emailVerified: boolean;
    uid: string;
  },
}

export interface IAddCatalog extends Action<'ADD_CATALOG'> {
  id: number,
  name: string;
}
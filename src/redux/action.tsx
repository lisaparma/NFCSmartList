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

export interface IInfoDevice extends Action<'DEVICE_INFO'> {
  pixelRatio: number;
  os: "ios" | "android";
  nfc: boolean;
}

export interface IAddCatalog extends Action<'ADD_CATALOG'> {
  cid: string;
  name: string;
  class: "standard";
  description: string;
  items?: IItem[];
}

export interface IRemoveCatalog extends Action<'REMOVE_CATALOG'> {
  cid: string;
}

export interface IPopulateCatalogs extends Action<'POPULATE_CATALOGS_LIST'> {
  catalogs: ICatalog[];
}

export interface IAddItem extends Action<'ADD_ITEM'> {
  cid: string;
  iid: string;
  name: string;
  description: string;
}

export interface IRemoveItem extends Action<'REMOVE_ITEM'> {
  cid: string;
  iid: string;
}

export interface IEditItem extends Action<'EDIT_ITEM'> {
  cid: string;
  iid: string;
  name: string;
  description: string;
}

export interface ICheckInItem extends Action<'CHECKIN_ITEM'> {
  cid: string;
  iid: string;
  name: string;
}

export interface ICheckOutItem extends Action<'CHECKOUT_ITEM'> {
  cid: string;
  iid: string;
}
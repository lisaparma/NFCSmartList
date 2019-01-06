import { Action } from "redux";
import {ICatalog, IItem, IFriend} from "./IStore";

export interface IAuthentication extends Action<'LOGIN' | 'LOGOUT'> {}

export interface IInfoAccount extends Action<'INFO'> {
    isNewUser: boolean;
    email: string;
    uid: string;
}

export interface IInfo2Account extends Action<'INFO2'> {
  username: string;
  avatar: number;
}

export interface IEditUsername extends Action<'EDIT_USERNAME'> {
  username: string;
}

export interface IEditAvatar extends Action<'EDIT_AVATAR'> {
  avatar: number;
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
  private: boolean;
}

export interface IRemoveCatalog extends Action<'REMOVE_CATALOG'> {
  cid: string;
}

export interface IEditCatalog extends Action<'EDIT_CATALOG'> {
  cid: string;
  name: string;
  description: string;
  private: boolean;
}

export interface IPopulateCatalogs extends Action<'POPULATE_CATALOGS_LIST'> {
  catalogs: { [cid: string]: ICatalog };
}

export interface IAddItem extends Action<'ADD_ITEM'> {
  cid: string;
  iid: string;
  name: string;
  description: string;
  tag: string;
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

export interface IPopulateFriends extends Action<'POPULATE_FRIENDS_LIST'> {
  friends: { [uid: string]: IFriend};
}

export interface IAddFriend extends Action<'ADD_FRIEND'> {
  uid: string;
  email: string;
  catalogs: { [cid: string]: ICatalog };
}

export interface IFrCheckInItem extends Action<'FR_CHECKIN_ITEM'> {
  uid: string;
  cid: string;
  iid: string;
  name: string;
}

export interface IFrCheckOutItem extends Action<'FR_CHECKOUT_ITEM'> {
  uid: string;
  cid: string;
  iid: string;
}
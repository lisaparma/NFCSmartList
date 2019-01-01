import {PixelRatio, Platform} from "react-native";

export interface IStore {
	auth: boolean,
	user: IUser;
	catalogs: { [id: string]: ICatalog};
  friends: { [uid: string]: IFriend};
}

export interface IUser {
	isNewUser: boolean;
	email: string;
	photoURL: string | null;
	phoneNumber: string | null;
	displayName: string | null;
	providerID: "password";
	emailVerified: boolean;
	uid: string;
	pixelRatio: number;
	os: "ios" | "android";
	nfc: boolean;
}

export interface ICatalog {
	cid: string;
	class: "standard";
	name: string;
	description: string;
	items: { [id: string]: IItem};
	check?: { [id: string]: IItem};
}

export interface IItem {
	iid: string;
	name: string;
	description?: string;
	tag: string;
	check?: boolean;
}

export interface IFriend {
	uid: string;
	email: string;
}
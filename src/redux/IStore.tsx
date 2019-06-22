export interface IStore {
	auth: boolean,
	user: IUser;
	catalogs: { [id: string]: ICatalog};
  friends: { [uid: string]: IFriend};
}

export interface IUser {
	isNewUser: boolean;
	email: string;
	uid: string;
	username: string;
	avatar: number;
	pixelRatio: number;
	os: "ios" | "android";
	nfc: boolean;
}

export interface ICatalog {
	cid: string;
	mod: number;
	name: string;
	description: string;
	items: { [id: string]: IItem};
	check?: { [id: string]: IItem};
	private: boolean;
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
	catalogs: { [id: string]: ICatalog};
	username: string,
	avatar: number
}
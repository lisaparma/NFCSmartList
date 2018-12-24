
export interface IStore {
	auth: boolean,
	user: IUser;
	catalogs: { [id: string]: ICatalog};
  friends: IFriend[];
}

export interface IUser {
	isNewUser: boolean;
	email: string;
	photoURL: string | null;
	phoneNumber: string | null;
	displayName: string | null;
	providerID: "password";
	emailVerified: boolean;
	uid:string;
}

export interface ICatalog {
	cid: string;
	class: "standard";
	name: string;
	description: string;
	items: IItem[];
}

export interface IItem {
	iid: string;
	name: string;
	description: string;
	tag: string;
}

interface IFriend {

}

export interface IStore {
	auth: boolean,
	user: IUser;
	catalogs: ICatalog[];
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
	id: string;
	name: string;
}

interface IFriend {

}
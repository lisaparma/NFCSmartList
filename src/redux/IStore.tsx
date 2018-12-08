
export interface IStore {
	auth: boolean,
	user: IUser;
	catalogs: ICatalog[];
  friends: IFriend[];
}

interface IUser {
	isNewUser: boolean;
	email: string;
	photoURL: string | null;
	phoneNumber: string | null;
	displayName: string | null;
	providerID: "password";
	emailVerified: boolean;
	uid:string;
}

interface ICatalog {

}

interface IFriend {

}
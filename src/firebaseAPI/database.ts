import firebase from 'react-native-firebase';

import {store} from "../App";

export default class Database {
  public static addUser(info: any){
    firebase.database().ref('users/'+ info.user.uid).set({
      username: info.user.displayName,
      email: info.user.email,
      uid: info.user.uid
    })
      .then(() => console.warn("inserito"))
      .catch((ok) => console.warn("non inserito"))
  }

  public static addCatalog(name: string, description: string){
    const path = 'users/'+ store.getState().user.uid + "/catalogs/";
    const id = store.getState().catalogs.length;
    firebase.database().ref(path + id).set({
      id: id,
      name: name,
      description: description,
    })
      .then(() => console.warn("inserito"))
      .catch((ok) => console.warn("non inserito"))
  }


}
import firebase from 'react-native-firebase';

import {store} from "../App";
import {IPopulateCatalogs} from "../redux/action";
import {ICatalog} from "../redux/IStore";

export default class Database {
  public static addUser(info: any){
    firebase.database().ref('users/'+ info.user.uid).set({
      username: info.user.displayName,
      email: info.user.email,
      uid: info.user.uid
    })
      .catch((err) => console.warn(err))
  }

  public static addCatalog(name: string, description: string) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/";
    const id = Object.keys(store.getState().catalogs).length;
    firebase.database().ref(path + id).set({
      id: id,
      name: name,
      description: description,
    })
      .catch((err) => console.warn(err))
  }

  public static initStore(uid) {
    firebase.database().ref('/users/' + uid + "/catalogs").once('value')
      .then((snapshot) => {
      const catalogs: ICatalog[] = [];
      snapshot.forEach(
        (item) => {
          catalogs.push({
            id: item.val().id,
            name: item.val().name,
            description: item.val().description,
          });
      });
      store.dispatch<IPopulateCatalogs>({
        type: "POPULATE_CATALOGS_LIST",
        catalogs: catalogs,
      });
    });
  }


}
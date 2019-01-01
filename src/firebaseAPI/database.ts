import firebase from 'react-native-firebase';

import {store} from "../App";
import {IPopulateCatalogs} from "../redux/action";

export default class Database {
  public static addUser(info: any){
    firebase.database().ref('users/'+ info.user.uid).set({
      username: info.user.displayName,
      email: info.user.email,
      uid: info.user.uid
    })
      .catch((err) => console.warn(err))
  }

  public static addCatalog(id: string, name: string, description: string) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/";
    firebase.database().ref(path + id).set({
      cid: id,
      name: name,
      description: description,
      class: "standard",
      items: {},
    })
      .catch((err) => console.warn(err))
  }

  public static removeCatalog(id: string) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/";
    firebase.database().ref(path + id).remove()
      .catch((err) => console.warn(err))
  }

  public static editCatalog(cid: string, name: string, description: string) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/" + cid;
    firebase.database().ref(path).update({name: name, description: description})
      .catch((err) => console.warn(err))
  }

  public static initStore(uid) {
    firebase.database().ref('/users/' + uid + "/catalogs").once('value')
      .then((snapshot) => {
      let catalogs = {};
      snapshot.forEach(
        (item) => {
          catalogs[item.val().cid] = {
            cid: item.val().cid,
            name: item.val().name,
            description: item.val().description,
            items: item.val().items,
            class: item.val().class
          };
      });
      store.dispatch<IPopulateCatalogs>({
        type: "POPULATE_CATALOGS_LIST",
        catalogs: catalogs,
      });
    });
  }

  public static addItem(cid: string, iid: string, name: string, description: string, tag: string) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/" + cid + "/items/";
    firebase.database().ref(path + iid).set({
      iid: iid,
      name: name,
      description: description,
      tag: tag
    })
      .catch((err) => console.warn(err))
  }

  public static removeItem(cid: string, iid: string) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/" + cid + "/items/";
    firebase.database().ref(path + iid ).remove()
      .catch((err) => console.warn(err))
  }

  public static editItem(cid: string, iid: string, name: string, description: string) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/" + cid + "/items/";
    firebase.database().ref(path + iid).update({name: name, description: description})
      .catch((err) => console.warn(err))
  }


}
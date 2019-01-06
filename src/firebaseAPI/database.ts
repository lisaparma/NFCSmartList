import firebase from 'react-native-firebase';

import {store} from "../App";
import {IInfo2Account, IPopulateCatalogs, IPopulateFriends} from "../redux/action";

export default class Database {
  public static addUser(info: any, username: string){
    firebase.database().ref('users/'+ info.user.uid).set({
      email: info.user.email,
      username: username,
      avatar: 36,
      uid: info.user.uid
    })
      .catch((err) => console.warn(err))
  }

  public static initStore(uid: string) {
    firebase.database().ref('/users/' + uid + "/catalogs").once('value')
      .then((snapshot) => {
        let catalogs = {};
        snapshot.forEach(
          (item): any => {
            catalogs[item.val().cid] = {
              cid: item.val().cid,
              name: item.val().name,
              description: item.val().description,
              items: item.val().items,
              class: item.val().class,
              private: item.val().private
            };
          });
        store.dispatch<IPopulateCatalogs>({
          type: "POPULATE_CATALOGS_LIST",
          catalogs: catalogs,
        });
      });
    firebase.database().ref('/users/' + uid).once('value')
      .then((snapshot) => {
        store.dispatch<IInfo2Account>({
          type: "INFO2",
          username: snapshot.val().username,
          avatar: snapshot.val().avatar,
        });
      });
    firebase.database().ref('/users/' + uid + "/friends").once('value')
      .then((snapshot) => {
        let friends = {};
        snapshot.forEach(
          (item): any => {
            let cat = {};
            firebase.database().ref('/users/' + item.val().uid + "/catalogs").once('value')
              .then((snapshot2) => {
                snapshot2.forEach(
                  (item2): any => { // per ogni catalogo dell'amico
                    if (!item2.val().private) {
                      cat[item2.val().cid] = item2.val();
                    }
                  }
                );
              })
            friends[item.val().uid] = {
              uid: item.val().uid,
              email: item.val().email,
              catalogs: cat,
            };
          }
        );
        store.dispatch<IPopulateFriends>({
          type: "POPULATE_FRIENDS_LIST",
          friends: friends,
        });
      });
  }

  public static addCatalog(id: string, name: string, description: string, pvt: boolean) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/";
    firebase.database().ref(path + id).set({
      cid: id,
      name: name,
      description: description,
      class: "standard",
      items: {},
      private: pvt
    })
      .catch((err) => console.warn(err))
  }

  public static removeCatalog(id: string) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/";
    firebase.database().ref(path + id).remove()
      .catch((err) => console.warn(err))
  }

  public static editCatalog(cid: string, name: string, description: string, pvt: boolean) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/" + cid;
    firebase.database().ref(path).update({name: name, description: description, private: pvt})
      .catch((err) => console.warn(err))
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

  public static addFriend(id: string, email: string, catalogs: {}) {
    const path = 'users/'+ store.getState().user.uid + "/friends/";
    firebase.database().ref(path + id).set({
      uid: id,
      email: email,
    })
      .catch((err) => console.warn(err))
  }

  public static editUser(name: string) {
    const path = 'users/'+ store.getState().user.uid;
    firebase.database().ref(path).update({username: name})
      .catch((err) => console.warn(err))
  }

  public static editAvatar(avatar: number) {
    const path = 'users/'+ store.getState().user.uid;
    firebase.database().ref(path).update({avatar: avatar})
      .catch((err) => console.warn(err))
  }

}
import firebase from 'react-native-firebase';

import {store} from "../App";
import {
  IAddFriend,
  IAddFriend2,
  IInfo2Account,
  IPopulateCatalogs,
  IPopulateFriends,
  IPopulateLikes
} from "../redux/action";

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
    // Popolo cataloghi
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
              mod: item.val().mod,
              private: item.val().private
            };
          });
        store.dispatch<IPopulateCatalogs>({
          type: "POPULATE_CATALOGS_LIST",
          catalogs: catalogs,
        });
      });

    // Popolo info mio account
    firebase.database().ref('/users/' + uid).once('value')
      .then((snapshot) => {
        store.dispatch<IInfo2Account>({
          type: "INFO2",
          username: snapshot.val().username,
          avatar: snapshot.val().avatar,
        });
      });

    // Popolo Like
    firebase.database().ref('/users/' + uid + "/likes").once('value')
      .then((snapshot) => {
        let likes = {};
        snapshot.forEach(
          (item): any => {
            likes[item.val().cid] = {
              cid: item.val().cid,
              uid: item.val().uid
            };
          });
        store.dispatch<IPopulateLikes>({
          type: "POPULATE_LIKES_LIST",
          likes: likes,
        });
      });

    // Popolo amici
    firebase.database().ref('/users/' + uid + "/friends").once('value')
      .then((snapshot) => {
        let friends = {};
        snapshot.forEach(
          (item): any => {
            let cat = {};
            let user = "";
            let avat = null;
            firebase.database().ref('/users/' + item.val().uid).on(
              'value',
              (snapshot3) => {
                user=snapshot3.val().username;
                avat=snapshot3.val().avatar;
                for(const item2 in snapshot3.val().catalogs) {
                  if (!snapshot3.val().catalogs[item2].private) {
                    cat[item2] = snapshot3.val().catalogs[item2];
                    if(store.getState().likes[item2]) {
                      cat[item2].like = true;
                    } else {
                      cat[item2].like = false;
                    }
                  }
                }
                friends[item.val().uid] = {
                  uid: item.val().uid,
                  username: user,
                  email: item.val().email,
                  catalogs: cat,
                  avatar: avat
                };
                store.dispatch<IAddFriend2>({
                  type: "ADD_FRIEND2",
                  friend: friends[item.val().uid]
                });

              })
          }
        );
      });

  }

  public static addCatalog(id: string, name: string, description: string, pvt: boolean, mod: number) {
    const path = 'users/'+ store.getState().user.uid + "/catalogs/";
    firebase.database().ref(path + id).set({
      cid: id,
      name: name,
      description: description,
      mod: mod,
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

  public static addFriend(id: string, email: string) {
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

  public static addLike(uid: string, cid: string) {
    const path = 'users/'+ store.getState().user.uid + "/likes/";
    firebase.database().ref(path + cid).set({
      cid: cid,
      uid: uid
    })
      .catch((err) => console.warn(err))
  }

  public static removeLike(cid: string) {
    const path = 'users/'+ store.getState().user.uid + "/likes/";
    firebase.database().ref(path + cid).remove()
      .catch((err) => console.warn(err))
  }

}
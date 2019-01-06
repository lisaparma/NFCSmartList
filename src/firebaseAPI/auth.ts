import firebase from 'react-native-firebase';

import {store} from "../App";
import {IAuthentication, IInfoAccount} from "../redux/action";
import Database from "./database";

export default class Auth {

  public static registerAccount(email:string, password: string, username: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(value => {
        Auth.getUserInfo(value);
        Database.addUser(value, username);
      })
      .catch(function(error) {
      console.warn(error);
    });
  }

  public static signIn(email:string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(value => {Auth.getUserInfo(value);})
      .catch((error) => {
        console.warn(error);
      });
  }

  public static getUserInfo(info?: any) {
    if (!info) {
      if (firebase.auth().currentUser) {
        const user = firebase.auth().currentUser;
        store.dispatch<IAuthentication>({
          type: "LOGIN"
        });
        store.dispatch<IInfoAccount>({
          type: "INFO",
          isNewUser: false,
          email: user.email,
          uid: user.uid,
        })
        Database.initStore(store.getState().user.uid);
      }
    } else {
      store.dispatch<IAuthentication>({
        type: "LOGIN"
      });
      store.dispatch<IInfoAccount>({
        type: "INFO",
        isNewUser: info.additionalUserInfo.isNewUser,
        email: info.user.email,
        uid: info.user.uid,
      })
      Database.initStore(store.getState().user.uid);
    }
  }

  // TODO: resettare tutti i dati
  public static logout() {
    store.dispatch<IAuthentication>({
      type: "LOGOUT",
    })
    firebase.auth().signOut()
  }

};

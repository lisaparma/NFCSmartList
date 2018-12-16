import firebase from 'react-native-firebase';

import {store} from "../App";
import {IAuthentication, IInfoAccount} from "../redux/action";
import Database from "./database";

export default class Auth {

  public static registerAccount(email:string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(value => {
        Auth.getUserInfo(value);
        Database.addUser(value);
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
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
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
        photoURL: info.user.photoURL,
        phoneNumber: info.user.phoneNumber,
        displayName: info.user.displayName,
        emailVerified: info.user.emailVerified,
        uid: info.user.uid,
      })
      Database.initStore(store.getState().user.uid);
    }
  }

  // TODO: resettare tutti i dati
  public static logout() {
    firebase.auth().signOut()
      .then(value => {
        store.dispatch<IAuthentication>({
          type: "LOGOUT",
        })
      });
  }

};

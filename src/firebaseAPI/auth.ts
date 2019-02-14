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

  public static signIn(ref: any, email:string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(value => {Auth.getUserInfo(value);})
      .catch(function(error) {
          var errorCode = error.code;
          if (errorCode === 'auth/wrong-password') {
            console.log('Wrong password.');
            ref.error("Password errata")
          }
          if (errorCode === 'auth/invalid-email') {
            ref.error('Formato e-mail non valido');
          }
          if (errorCode === 'user-not-found') {
            ref.error('e-mail non registrata');
          }
        }
      );
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

  public static logout() {
    store.dispatch<IAuthentication>({
      type: "LOGOUT",
    })
    firebase.auth().signOut()
  }

};

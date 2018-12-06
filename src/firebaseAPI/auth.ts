import firebase from 'react-native-firebase';
import {Store} from 'redux';

import {store} from "../App";
import {IAuthentication} from "../redux/action";

export default class Auth {

  public static registerAccount(email:string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(value => {Auth.getUserID();})
      .catch(function(error) {
      console.warn(error);
    });
  }

  public static signIn(email:string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(value => {Auth.getUserID();})
      .catch(function(error) {
        console.warn(error);
      });
  }

  public static getUserID() {
    if(firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken()
        .then(value => {
          store.dispatch<IAuthentication>({
            type: "AUTH",
            auth: value,
          })
        });
    }
  }

  public static logout() {
    firebase.auth().signOut()
      .then(value => {
        store.dispatch<IAuthentication>({
          type: "AUTH",
          auth: null,
        })
      });
  }

};
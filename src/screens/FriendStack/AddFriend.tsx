import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import {store} from "../../App";
import {IAddFriend} from "../../redux/action";
import Database from "../../firebaseAPI/database";
import firebase from "react-native-firebase";

import {std} from "../../style";
import {info} from "../../style";

interface AddFriendProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface AddFriendState {
  email: string;
  error: boolean;
}

class AddFriend extends Component<AddFriendProps, AddFriendState> {

  constructor(props: AddFriendProps) {
    super(props);
    this.state = {
      email: "",
      error: false
    }
  }

  public render() {
    return (
      <View style={std.screen}>
        <Text style={std.title}> Aggiungi un amico:</Text>
        <View style={info.textBox}>
          <Text style={[std.text, info.t1]}>e-mail:</Text>
          <TextInput
            style={[std.text, info.t2]}
            placeholder="e-mail"
            onChangeText={text => this.setState({email: text.trim(), error: false})}
          />
        </View>
        { this.state.error &&
          <View style={{paddingTop: 10, alignItems: "center"}}>
            <View style={[std.error, {width: 200, alignItems: "center", paddingVertical: 5}]}>
              <Text style={[std.text, std.warningText]}>Indirizzo e-mail non trovato</Text>
            </View>
          </View>
        }
        <TouchableOpacity
          style={[std.button, this.state.email === "" && std.buttonDisabled]}
          onPress={this.add}
          disabled={this.state.email ===  ""}
        >
          <Text style={std.textButton}>Aggiungi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private add = () => {
    if(this.state.email !== "") {
      firebase.database().ref('users/').once('value')
        .then((snapshot) => {
          let find = false;
          snapshot.forEach(
            (user): any => {
              if(user.val().email === this.state.email) {
                find = true;
                store.dispatch<IAddFriend>({
                  type: "ADD_FRIEND",
                  uid: user.val().uid,
                  email: user.val().email,
                  catalogs: user.val().catalogs,
                  username: user.val().username,
                  avatar: user.val().avatar,
                });
                Database.addFriend(user.val().uid, user.val().email);
              }
              if(find) {
                this.props.navigation.navigate("Friends");
                return;
              }
            });
          if(!find) {
            this.setState({error: true})
          }
        });
    } else {
      // TODO: segnalare errore
    }
  }
}

export default withNavigation(AddFriend);
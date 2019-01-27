import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import {store} from "../../App";
import {IAddCatalog, IAddFriend} from "../../redux/action";
import Database from "../../firebaseAPI/database";
import firebase from "react-native-firebase";

import {std} from "../../style";
import {info} from "../../style";

interface AddFriendProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface AddFriendState {
  email: string;
}

class AddFriend extends Component<AddFriendProps, AddFriendState> {

  constructor(props: AddFriendProps) {
    super(props);
    this.state = {
      email: null,
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
            onChangeText={text => this.setState({email: text.trim()})}
          />
        </View>
        <TouchableOpacity
          style={std.button}
          onPress={this.add}>
          <Text style={std.textButton}>Aggiungi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private add = () => {
    if(this.state.email !== null) {
      firebase.database().ref('users/').once('value')
        .then((snapshot) => {
          let catalogs = {};
          snapshot.forEach(
            (user): any => {
              if(user.val().email === this.state.email) {
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
            });
        });
      this.props.navigation.navigate("Friends");
    }
  }
}

export default withNavigation(AddFriend);
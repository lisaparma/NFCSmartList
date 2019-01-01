import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import NfcManager, {ByteParser} from "react-native-nfc-manager";
import firebase from 'react-native-firebase';
import {IAddFriend, IPopulateCatalogs, IPopulateFriends} from "../../redux/action";
import Database from "../../firebaseAPI/database";

interface FriendsProps {
}

interface FriendsState {
  email: string;
  yy: string;
}

class Friends extends Component<FriendsProps, FriendsState> {

  private mUnsubscribeFromStore: any;

  constructor(props: FriendsProps) {
    super(props);
    this.state = {
      email: "",
      yy: "",
    }
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={text => this.setState({email: text})}
        />
        <TouchableOpacity
          onPress={this.check}>
          <Text>Cerca</Text>
        </TouchableOpacity>
        <Text>{this.state.yy}</Text>
      </View>
    );
  }

  private onStoreChange = () => {
  };

  private check = () => {
    firebase.database().ref('users/').once('value')
      .then((snapshot) => {
        let catalogs = {};
        snapshot.forEach(
          (user) => {
            if(user.val().email === this.state.email) {
              console.warn("Aggiunto: " + user.val().email);
              store.dispatch<IAddFriend>({
                type: "ADD_FRIEND",
                uid: user.val().uid,
                email: user.val().email,
              });
              Database.addFriend(user.val().uid, user.val().email);
            }
          });
      });
  }

}

export default withNavigation(Friends);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

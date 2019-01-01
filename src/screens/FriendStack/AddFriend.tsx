import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IAddCatalog, IAddFriend} from "../../redux/action";
import Database from "../../firebaseAPI/database";
import firebase from "react-native-firebase";


interface AddFriendProps {
  navigation: NavigationScreenProp<object>;
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
      <View style={styles.container}>
        <Text style={styles.text}> Aggiungi un amico:</Text>
        <TextInput
          style={styles.input}
          placeholder="e-mail"
          onChangeText={text => this.setState({email: text})}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.add}>
          <Text style={styles.textButton}>Aggiungi</Text>
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
      this.props.navigation.navigate("Friends");
    }
  }
}

export default withNavigation(AddFriend);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 25,
    color: "#0b6d99",
    fontFamily: "Yanone Kaffeesatz"
  },
  input: {
    padding: 10,
    fontSize: 20,
    fontFamily: "Yanone Kaffeesatz"
  },
  button: {
    padding: 5,
    marginHorizontal: "25%",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: '#0b6d99',
    width: "50%",
    paddingVertical: 10,
    borderRadius: 3,
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFF0",
    fontFamily: "Yanone Kaffeesatz"
  },
});

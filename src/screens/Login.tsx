import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';

import Auth from "../firebaseAPI/auth";
import {NavigationScreenProp, withNavigation} from "react-navigation";


interface AppProps {
  navigation: NavigationScreenProp<object>;
}


interface AppState {
  username: string;
  password: string;
}

class Login extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/nfc-logo.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={text => this.setState({username: text.toLocaleLowerCase()})}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text})}
        />
        <TouchableOpacity
          style={[styles.button, styles.entryButton]}
          onPress={this.signIn}>
          <Text style={styles.textButton}>Entra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress={()=>this.props.navigation.navigate("Signin")}>
          <Text style={styles.text}>Non sono registrato</Text>
        </TouchableOpacity>

      </View>
    );
  }

  private signIn = () => {
    if(this.state.username !== (undefined && "") && this.state.password !== (undefined && "")) {
      Auth.signIn(this.state.username, this.state.password);
    }
  }

}

export default withNavigation(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10A0E0',
  },
  image: {
    width: 100,
    height: 100,
    margin: 30
  },
  input: {
    backgroundColor: "#FFFFF0",
    width: "50%",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontSize: 15,
    fontFamily: "Yanone Kaffeesatz"
  },
  button: {
    padding: 5,
    margin: 5,
    alignItems: "center"
  },
  entryButton: {
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
  text: {
    textDecorationLine: "underline",
    fontFamily: "Yanone Kaffeesatz"
  }
});

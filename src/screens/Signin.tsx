import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import Auth from "../firebaseAPI/auth";
import {NavigationScreenProp, withNavigation} from "react-navigation";


interface AppProps {
  navigation: NavigationScreenProp<object>;
}

interface AppState {
  username: string;
  password: string;
}

class Signin extends Component<AppProps, AppState> {

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
          onPress={this.registerAcc}
        >
          <Text style={styles.textButton}>Registrati</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={()=>this.props.navigation.navigate("Login")}>
          <Text style={styles.text}>Sono già registrato</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private registerAcc = () => {
    if(this.state.username !== (undefined && "") && this.state.password !== (undefined && "")) {
      Auth.registerAccount(this.state.username, this.state.password);
    }
  }

}

export default withNavigation(Signin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10A0E0',
  },
  input: {
    backgroundColor: "#FFFFF0",
    width: "50%",
    borderRadius: 5,
    padding: 10,
    margin: 5
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFF0"
  },
  text: {
    textDecorationLine: "underline",
  }
});

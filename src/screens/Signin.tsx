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
  password2: string;
  error: string;
}

class Signin extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
      password2: undefined,
      error: undefined
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.error}</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Ripeti password"
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={text => this.setState({password2: text})}
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
    if(this.check()) {
      Auth.registerAccount(this.state.username, this.state.password);
    }
  };

  private check(): boolean {
    if(this.state.username === (undefined && "")
      && this.state.password === (undefined && "")
      && this.state.password2 === (undefined && "")){
      this.setState({error: "Compila tutti i campi"});
      return false;
    }
    if(this.state.password.toString().length < 8) {
      this.setState({error: "Password troppo corta"});
      return false;
    }
    if(this.state.password !== this.state.password2){
      this.setState({error: "Le due password non corrispondono"});
      return false;
    }
    return true;
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
  },
  error:{
    color: "#e01038",
  }
});

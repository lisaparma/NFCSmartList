import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import Auth from "../firebaseAPI/auth";
import {NavigationScreenProp, withNavigation} from "react-navigation";

import {std, log} from "../style";

interface AppProps {
  navigation: NavigationScreenProp<object>;
}

interface AppState {
  email: string;
  username: string;
  password: string;
  password2: string;
  error: string;
}

class Signin extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      email: undefined,
      username: "",
      password: undefined,
      password2: undefined,
      error: undefined
    }
  }

  public render() {
    return (
      <View style={log.screen}>
        <Text style={[std.text, std.warningText]}>{this.state.error}</Text>
        <TextInput
          style={log.input}
          placeholder="E-mail"
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={text => this.setState({email: text.toLocaleLowerCase()})}
        />
        <TextInput
          style={log.input}
          placeholder="username"
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={text => this.setState({username: text})}
        />
        <TextInput
          style={log.input}
          placeholder="Password"
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text})}
        />
        <TextInput
          style={log.input}
          placeholder="Ripeti password"
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={text => this.setState({password2: text})}
        />
        <TouchableOpacity
          style={[std.button, log.loginButton]}
          onPress={this.registerAcc}
        >
          <Text style={std.textButton}>Registrati</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate("Login")}>
          <Text style={[std.text, log.link]}>Sono già registrato</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private registerAcc = () => {
    if(this.check()) {
      Auth.registerAccount(this.state.email, this.state.password, this.state.username);
    }
  };

  private check(): boolean {
    if(this.state.email === (undefined && "")
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
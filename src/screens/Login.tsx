import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';

import Auth from "../firebaseAPI/auth";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from "react-navigation";

import {std, log} from "../style";

interface AppProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
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
      <View style={log.screen}>
        <Image
          style={log.image}
          source={require("../../assets/nfc-logo.png")}
        />
        <TextInput
          style={log.input}
          placeholder="E-mail"
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={text => this.setState({username: text.toLocaleLowerCase().trim()})}
        />
        <TextInput
          style={log.input}
          placeholder="Password"
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text.trim()})}
        />
        <TouchableOpacity
          style={[std.button, log.loginButton]}
          onPress={this.signIn}>
          <Text style={std.textButton}>Entra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate("Signin")}>
          <Text style={[std.text, log.link]}>Non sono registrato</Text>
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


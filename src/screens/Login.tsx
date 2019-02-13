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
  error: string;
}

class Login extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
      error: "",
    }
  }

  public render() {
    return (
      <View style={log.screen}>
        <Image
          style={log.image}
          source={require("../../assets/oink.png")}
        />
        <TextInput
          style={log.input}
          placeholder="E-mail"
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={text => this.setState({username: text.toLocaleLowerCase().trim(), error: ""})}
        />
        <TextInput
          style={log.input}
          placeholder="Password"
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text.trim(), error: ""})}
        />
        { this.state.error !== "" &&
        <View style={std.error}>
          <Text style={[std.text, std.warningText]}>{this.state.error}</Text>
        </View>
        }
        <TouchableOpacity
          style={[std.button, log.loginButton]}
          onPress={this.signIn}>
          <Text style={std.textButton}>Entra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate("Signin")}>
          <Text style={[std.text, log.link, {padding: 10}]}>Non sono registrato</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private signIn = () => {
    if(this.state.username !== (undefined && "") && this.state.password !== (undefined && "")) {
      Auth.signIn(this, this.state.username, this.state.password);
    }
  }

  private error(error: string) {
    this.setState({error: error})
  }

}

export default withNavigation(Login);


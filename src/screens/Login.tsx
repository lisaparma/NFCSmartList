import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, ScrollView} from 'react-native';

import Auth from "../firebaseAPI/auth";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from "react-navigation";

import {std, log, def} from "../style";

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
      username: "",
      password: "",
      error: "",
    }
  }

  public render() {
    return (
      <ScrollView style={log.screen}>
        <View style={log.screen2}>
          <Image
            style={log.image}
            source={require("../../assets/nfc-logo.png")}
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
            style={[
              std.button,
              log.loginButton,
              (this.state.username === "" || this.state.password ===  "") && {backgroundColor: def.grey1}
              ]}
            disabled={(this.state.username === "" || this.state.password ===  "")}
            onPress={this.signIn}
          >
            <Text style={std.textButton}>Entra</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate("Signin")}>
            <Text style={[std.text, log.link, {padding: 10}]}>Non sono registrato</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  private signIn = () => {
    if(this.state.username !== "" && this.state.password !==  "") {
      Auth.signIn(this, this.state.username, this.state.password);
    }
  }

  private error(error: string) {
    this.setState({error: error})
  }

}

export default withNavigation(Login);


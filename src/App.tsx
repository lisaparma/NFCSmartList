import React, {Component} from 'react';
import {Image, PixelRatio, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import NfcManager from 'react-native-nfc-manager'

import Login from "./screens/Login";
import Main from "./screens/Main";
import Auth from "./firebaseAPI/auth";
import Signin from "./screens/Signin";
import {StoreFactory} from "./redux/StoreFactory";
import Swiper from "react-native-swiper";
import {def, log, std} from "./style";
import {IAuthentication, IOld} from "./redux/action";


const storeFactory = new StoreFactory();
export const store = storeFactory.createStore();

const LogStack = createAppContainer(
  createStackNavigator(
  {
    Login: {
      screen: () => <Login/>,
      navigationOptions: () => ({
        header: <View/>,
      }),
    },
    Signin: {
      screen: () => <Signin/>,
      navigationOptions: () => ({
        header: <View/>,
      }),
    },
  },
  {
    initialRouteName: 'Login',
  }
));

interface AppProps {}

interface AppState {
  auth: boolean;
  new: boolean;
}

export default class App extends Component<AppProps, AppState> {

  private mUnsubscribeFromStore: any;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      auth: false,
      new: false,
    };
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
    Auth.getUserInfo();
    NfcManager.isSupported()
      .then((supp) => {
        store.dispatch({
          type: "DEVICE_INFO",
          pixelRatio: PixelRatio.get(),
          os: Platform.OS,
          nfc: supp
        })
      })
      .catch(err => console.warn(err))
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    if(this.state.auth) {
      if(this.state.new) {
        return (
          <Swiper showsButtons={false}>
            <View style={[styles.slide]}>
              <Text style={[std.text, styles.text]}>
                Benvenuto su NFC Smart List, l'applicazione che renderà smart la verifica delle tue liste grazie ai tag NFC!{"\n"}{"\n"}
                Associa un tag NFC agli item della tua lista in pochi passi...
              </Text>
              <TouchableOpacity onPress={()=>store.dispatch<IOld>({type: "OLD"})}>
                <Text style={[std.text, log.link]}>Salta</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.slide]}>
              <Text style={[std.text, styles.text]}>
                Se è la prima volta che usi un tag NFC in questa applicazione formattalo e associaci un id seguendo le indicazioni che troverai sulla pagina "settings"
              </Text>
              <Image
                style={log.image}
                source={require("../assets/oink.png")}
              />
              <TouchableOpacity onPress={()=>store.dispatch<IOld>({type: "OLD"})}>
                <Text style={[std.text, log.link]}>Salta</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.slide]}>
              <Text style={[std.text, styles.text]}>Aggiungi un item ad una lista scannerizzando il tag NFC{"\n"}</Text>
              <Image
                style={log.image}
                source={require("../assets/oink.png")}
              />
              <TouchableOpacity onPress={()=>store.dispatch<IOld>({type: "OLD"})}>
                <Text style={[std.text, log.link]}>Salta</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.slide]}>
              <Text style={[std.text, styles.text]}>Quando vorrai fare un check degli oggetti con un tag NFC associato ti basterà avvicinare il telefono al tag perchè questo venga riconosciuto{"\n"}</Text>
              <Image
                style={log.image}
                source={require("../assets/oink.png")}
              />
              <TouchableOpacity onPress={()=>store.dispatch<IOld>({type: "OLD"})}>
                <Text style={[std.text, log.link]}>Salta</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.slide]}>
              <TouchableOpacity style={styles.slide} onPress={()=>store.dispatch<IOld>({type: "OLD"})}>
                <Text style={[std.text, styles.text]}>Iniziamo!</Text>
              </TouchableOpacity>
            </View>
          </Swiper>
        );
      } else {
        return (
          <Main/>
        );
      }
    } else {
        return (
          <LogStack/>
        );
    }
  }

  private onStoreChange = () => {
    const currentState = store.getState();
    if (currentState.auth !== this.state.auth) {
      this.setState({
        auth: currentState.auth,
      });
    }
    if (currentState.user.isNewUser && !this.state.new) {
      this.setState({
        new: currentState.user.isNewUser,
      });

    }
  };
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: def.theme1,
    padding: 10
  },
  text: {
    color: def.white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center"
  }
})
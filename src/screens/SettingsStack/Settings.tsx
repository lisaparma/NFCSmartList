import React, {Component} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import Auth from "../../firebaseAPI/auth";
import {store} from "../../App";
import {def, info, std} from "../../style";
import {IEditUsername} from "../../redux/action";
import Database from "../../firebaseAPI/database";
import {getAvatar} from "../../../avatars/avatar";
import {IUser} from "../../redux/IStore";
import {Icon} from "react-native-elements";
import {SettingsCard} from "../../components/SettingsCard";

interface SettingsProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface SettingsState {
  edit: boolean;
  username: string;
  email: string;
  avatar: number;
  modal: boolean;
}

class Settings extends Component<SettingsProps, SettingsState> {

  private mUnsubscribeFromStore: any;

  constructor(props: SettingsProps) {
    super(props);
    const user = store.getState().user;
    this.state = {
      edit: false,
      username: user.username,
      email: user.email,
      avatar: store.getState().user.avatar,
      modal: false,
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
      <ScrollView style={styles.page}>
        {/*<View style={styles.data}>*/}
          {/*<Image*/}
            {/*style={{width: 100, height: 100}}*/}
            {/*source={getAvatar(this.state.avatar)}*/}
          {/*/>*/}
          {/*<View style={styles.dataBox}>*/}
            {/*<Text style={std.title}>{this.state.username}</Text>*/}
            {/*<Text style={std.text}>{this.state.email}</Text>*/}
          {/*</View>*/}
        {/*</View>*/}

        <View style={styles.box}>
          <Text style={[std.text, styles.titleBox]}> Dati personali</Text>
          <View style={styles.card}>
            <View style={{flex:1, flexDirection: "row", alignItems: "center"}}>
              <Text style={std.text}>E-mail: </Text>
              <Text style={[std.text, {color: def.grey1, paddingRight: 10}]}>{this.state.email}</Text>
            </View>
          </View>
          {!this.state.edit?
            <View style={styles.card}>
              <View style={{flex:1, flexDirection: "row", alignItems: "center"}}>
                <Text style={std.text}>Nickname: </Text>
                <Text style={[std.text, {color: def.grey1, paddingRight: 10}]}>{this.state.username}</Text>
              </View>
              <TouchableOpacity
                style={{paddingLeft:20}}
                activeOpacity={0.3}
                onPress={() => {
                  if(this.state.edit)
                    this.editUser();
                  this.setState({edit: !this.state.edit});
                }}
              >
                <Icon
                  color={def.grey1}
                  name={"edit"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            :
            <View style={styles.card}>
              <View style={{flex:1, flexDirection: "row", alignItems: "center"}}>
                <Text style={std.text}>Nickname: </Text>
                <TextInput
                  style={[std.text, info.input, {padding:5, paddingRight: 10, alignContent: "center"}]}
                  onChangeText={text => this.setState({username: text})}>
                  {this.state.username}
                </TextInput>
              </View>
              <TouchableOpacity
                style={{paddingLeft:20}}
                activeOpacity={0.3}
                onPress={() => {
                  if(this.state.edit)
                    this.editUser();
                  this.setState({edit: !this.state.edit});
                }}
              >
                <Icon
                  color={def.green}
                  name={"done"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          }
          <View style={styles.card}>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
              <Text style={std.text}>Avatar: </Text>
              <View style={{paddingRight: 10}}>
                <Image
                  style={{width: 30, height: 30}}
                  source={getAvatar(this.state.avatar)}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{paddingLeft:20}}
              activeOpacity={0.3}
              onPress={()=>this.props.navigation.navigate("Avatars")}
            >
              <Icon
                color={def.grey1}
                name={"edit"}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={[std.text, styles.titleBox]}> Aiuto</Text>
          <SettingsCard
            icon={"add"}
            text={"Contattaci"}
            navigation={this.props.navigation}
            page={"Contattaci"}/>
          <SettingsCard
            icon={"add"}
            text={"Licenze"}
            navigation={this.props.navigation}
            page={"License"}/>
        </View>

        {store.getState().user.os === "ios" &&
        < TouchableOpacity
          style={[styles.card, styles.esc]}
          onPress={()=>{this.setState({modal: true})}}>
          <Text style={[std.textButton, std.warningText]}>Esci</Text>
          </TouchableOpacity>
        }

        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {this.setState({modal: false})}}
        >
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.textModal}>Sei sicuro di voler uscire?</Text>
              <View style={std.boxButton}>
              <TouchableOpacity
                  style={[std.modalButton1]}
                  onPress={() => {
                    this.setState({modal: false});

                    Auth.logout();
                  }}>
                  <Text style={std.text}>Esci</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={std.modalButton2}
                  onPress={() => {
                    this.setState({modal: false});
                  }}>
                  <Text style={std.text}>Annulla</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    );
  }

  private onStoreChange = () => {
    const currentState: IUser = store.getState().user;
    if(currentState.avatar !== this.state.avatar) {
      this.setState({
        avatar: currentState.avatar,
      });
    }
  };

  private editUser = () => {
    this.setState({edit: false});
    store.dispatch<IEditUsername>({
      type: "EDIT_USERNAME",
      username: this.state.username,
    });
    Database.editUser(this.state.username);
  };

}

export const styles = StyleSheet.create({
  page: {
    backgroundColor: def.grey2,
    flex: 1,
  },
  data: {
    padding: 20,
    backgroundColor: def.white,
    flexDirection: "row",
  },
  titleBox: {
    fontSize: 16,
    color: def.grey0,
    paddingBottom: 5
  },
  dataBox: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  box: {
    marginVertical: 5,
  },
  card:{
    backgroundColor: def.white,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 0.3,
    borderColor: def.grey1,
    padding: 6,
  },
  esc: {
    justifyContent: 'center',
    borderColor: def.red,
    marginTop: 15,
  }
});

export default withNavigation(Settings);
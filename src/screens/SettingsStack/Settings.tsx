import React, {Component} from 'react';
import {Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import Auth from "../../firebaseAPI/auth";
import {ByteParser, Ndef} from "react-native-nfc-manager";
import NfcManager from "react-native-nfc-manager";
import {store} from "../../App";

import {card, def, info, std} from "../../style";
import {IEditUsername} from "../../redux/action";
import Database from "../../firebaseAPI/database";
import {getAvatar} from "../../../avatars/avatar";
import {IUser} from "../../redux/IStore";
import {Icon} from "react-native-elements";
import {SettingsCard} from "../../components/SettingsCard";

interface SettingsProps {
  navigation: NavigationScreenProp<object>;
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
        <View style={styles.data}>
          <Image
            style={{width: 100, height: 100}}
            source={getAvatar(this.state.avatar)}
          />
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>e-mail:</Text>
            <Text style={[std.text, info.t2]}>{this.state.email}</Text>
          </View>
          {!this.state.edit &&
            <View>
              <View style={[info.textBox, {justifyContent: "space-between"}]}>
                <Text style={[std.text, info.t1]}>Username:</Text>
                <Text style={[std.text, info.t2, {flex:1}]}>{this.state.username}</Text>
                <TouchableOpacity
                  style={card.icon}
                  onPress={()=>{this.setState({edit: true})}}>
                  <Icon
                    color={"#a8aaaa"}
                    name={"edit"}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }
          {this.state.edit &&
            <View>
              <View style={[info.textBox, {justifyContent: "space-between"}]}>
                <Text style={[std.text, info.t1]}>Username:</Text>
                <TextInput
                  style={[std.text, info.t2, {flex:1}]}
                  onChangeText={text => this.setState({username: text.trim()})}>
                  {this.state.username}
                </TextInput>
                <TouchableOpacity
                  style={card.icon}
                  onPress={this.editUser}>
                  <Icon
                    color={"#88c25d"}
                    name={"done"}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
        <View style={styles.box}>
          <Text style={[std.text, styles.titleBox]}> Dati personali</Text>
          <SettingsCard
            icon={"add"}
            text={"Pic"}
            navigation={this.props.navigation}
            page={"Avatars"}/>
        </View>

        {store.getState().user.os === "android" &&
        <View style={styles.box}>
          <Text style={[std.text, styles.titleBox]}> NFC Manager</Text>
          <SettingsCard
            icon={"add"}
            text={"Set id"}
            navigation={this.props.navigation}
            page={"NFCid"}/>
          <SettingsCard
            icon={"add"}
            text={"Formatta id"}
            navigation={this.props.navigation}
            page={"NFCformat"}/>
        </View>
        }

        <View style={styles.box}>
          <Text style={[std.text, styles.titleBox]}> Aiuto</Text>
          <SettingsCard
            icon={"add"}
            text={"FAQ"}
            navigation={this.props.navigation}
            page={""}/>
          <SettingsCard
            icon={"add"}
            text={"Contattaci"}
            navigation={this.props.navigation}
            page={""}/>
          <SettingsCard
            icon={"add"}
            text={"Termini e Informativa sulla privacy"}
            navigation={this.props.navigation}
            page={""}/>
          <SettingsCard
            icon={"add"}
            text={"Licenze"}
            navigation={this.props.navigation}
            page={""}/>
        </View>

        <TouchableOpacity
          style={styles.esc}
          onPress={()=>{this.setState({modal: true})}}>
          <Text style={[std.textButton, std.warningText]}>Esci</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {this.setState({modal: false})}}
        >
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.text}>Sei sicuro di voler uscire?</Text>
                <TouchableOpacity
                  style={[std.modalButton]}
                  onPress={() => {
                    this.setState({modal: false});
                    Auth.logout();
                  }}>
                  <Text style={std.text}>Esci</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={std.modalButton}
                  onPress={() => {
                    this.setState({modal: false});
                  }}>
                  <Text style={std.text}>Annulla</Text>
                </TouchableOpacity>

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
    padding: 10,
    backgroundColor: def.white,
  },
  titleBox: {
    fontSize: 14,
  },
  box: {
    marginVertical: 5,
  },
  esc: {
    backgroundColor: def.white,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 0.3,
    borderColor: def.red,
    marginTop: 15,
    padding: 6,
  }
});

export default withNavigation(Settings);
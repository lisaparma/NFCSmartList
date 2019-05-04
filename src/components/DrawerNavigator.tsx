import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView, TouchableOpacity, Modal,
} from 'react-native';

import {def, std} from "../style";
import {getAvatar} from "../../avatars/avatar";
import {DrawerItems} from "react-navigation";
import {IUser} from "../redux/IStore";
import Auth from "../firebaseAPI/auth";
import {store} from "../App";

interface DrawerNavigatorProps {
  navProps: any;
  user: IUser;
}

export default class DrawerNavigator extends Component<DrawerNavigatorProps> {

  constructor(props: DrawerNavigatorProps) {
    super(props);
    const user = store.getState().user;
    this.state = {
      modal: false
    }
  }

  public render() {
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}>
        <ScrollView>
          <View style={styles.box}>
            <Image
              style={styles.pic}
              source={require("../../assets/dream.png")}/>
            <View style={{padding: 30}}>
              <View style={{paddingVertical: 10}}>
                <Image
                  style={{width: 100, height: 100, opacity: 1}}
                  source={getAvatar(this.props.user.avatar)}
                />
              </View>
              <Text style={std.title}>
                {this.props.user.username}
              </Text>
              <Text style={std.text}>
                {this.props.user.email}
              </Text>
            </View>
          </View>
          <DrawerItems {...this.props.navProps}
             getLabel = {(scene) => (
               <View style={{paddingVertical: 20}}>
                 <Text>{this.props.navProps.getLabel(scene)}</Text>
               </View>
             )}
          />
        </ScrollView>
        <TouchableOpacity
          style={[styles.card, styles.esc]}
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

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: def.theme1,
  },
  box: {
    borderBottomWidth: 2,
    borderBottomColor: def.theme1,
  },
  pic: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.3,
    width: "100%",
    height: "100%",
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

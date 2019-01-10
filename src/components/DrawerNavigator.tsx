import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import {Icon} from "react-native-elements";

import {store} from "../App";
import {IAddItem} from "../redux/action";
import Database from "../firebaseAPI/database";
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";
import {card, std} from "../style";
import {getAvatar} from "../../avatars/avatar";
import {DrawerItems} from "react-navigation";
import {IUser} from "../redux/IStore";

interface DrawerNavigatorProps {
  navProps: any;
  user: IUser;
}

interface DrawerNavigatorState {
}

export default class DrawerNavigator extends Component<DrawerNavigatorProps, DrawerNavigatorState> {

  constructor(props: DrawerNavigatorProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.box}>
            <View style={{paddingVertical: 10}}>
            <Image
              style={{width: 100, height: 100}}
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
          <DrawerItems {...this.props.navProps} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    padding: 30,
    backgroundColor: "#FFA500"
  }
});
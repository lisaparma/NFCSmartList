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
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <ScrollView>
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
          <DrawerItems {...this.props.navProps}
             getLabel = {(scene) => (
               <View style={{paddingVertical: 20}}>
                 <Text>{this.props.navProps.getLabel(scene)}</Text>
               </View>
             )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#10A0E0",
  },
  box: {
    borderBottomWidth: 2,
    borderBottomColor: "#10A0E0",
    padding: 30,
  }
});

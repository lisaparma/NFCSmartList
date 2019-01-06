import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, ListView} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IEditAvatar, IRemoveCatalog} from "../../redux/action";
import {ICatalog, IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";
import ItemCard from "../../components/ItemCard";
import AddItem from "../../components/AddItem";
import {Icon} from "react-native-elements";
import NfcManager, {ByteParser} from "react-native-nfc-manager";

import {std} from "../../style";
import {getAvatar} from "../../../avatars/avatar";

interface AvatarsProps {
  navigation: NavigationScreenProp<object>;
}

interface AvatarsState {
  now: number;
}

class Avatars extends Component<AvatarsProps, AvatarsState> {

  constructor(props: AvatarsProps) {
    super(props);
    this.state = {
      now: this.props.navigation.getParam("avatar"),
    }
  }

  public render() {
    let icons = [];
    for(let i = 1; i<49; i++) {
      icons.push(
        <TouchableOpacity
          key={i}
          style={[styles.icon, (i !== this.state.now) && styles.now]}
          onPress={() => this.editAvatar(i)}>
          <Image
            style={styles.pic}
            source={getAvatar(i)}
          />
        </TouchableOpacity>);
    }
    return (
      <View style={std.screen}>
        <Text style={std.title}>
          Scegli un avatar:
        </Text>
        <ScrollView
          contentContainerStyle={styles.grid}>
          {icons}
        </ScrollView>
      </View>
    );
  }

  private editAvatar(nr: number){
    store.dispatch<IEditAvatar>({
      type: "EDIT_AVATAR",
      avatar: nr,
    });
    Database.editAvatar(nr);
    this.props.navigation.dispatch(NavigationActions.back());
  };

}

export default withNavigation(Avatars);


const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
  },
  icon: {
    width: 100,
    height: 100,
    alignContent: "center",
    justifyContent: 'center',

  },
  now: {

  },
  pic: {
    width: 80,
    resizeMode: "contain",
  }
});

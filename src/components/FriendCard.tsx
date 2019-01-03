import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {ICatalog, IFriend} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";

interface FriendCardProps {
  navigation: NavigationScreenProp<object>;
  friend: IFriend;
}

interface FriendCardState {
}

export default class FriendCard extends Component<FriendCardProps, FriendCardState> {

  constructor(props: FriendCardProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={()=> this.props.navigation.navigate(
          "FCatalogList",
          {catalogs: this.props.friend.catalogs, uid: this.props.friend.uid}
        )}>
        <View style={styles.image}>
          <Icon
            name={"assignment"}
            size={50}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text1}> {this.props.friend.email} </Text>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderColor: "#87CEFA",
    borderWidth: 1,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    margin: 10,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  image: {
    paddingHorizontal: 10
  },
  textBox: {
  },
  text1: {
    color: "#0b6d99",
    fontSize: 20,
    fontFamily: "Yanone Kaffeesatz"
  },
  text2: {
    fontSize: 15,
    fontFamily: "Yanone Kaffeesatz"
  }

});

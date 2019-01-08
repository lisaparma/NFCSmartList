import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {Icon} from "react-native-elements";
import {ICatalog, IFriend} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";
import {getAvatar} from "../../avatars/avatar";
import {card, std} from "../style";

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
        style={[card.container, card.contFriend]}
        onPress={()=> this.props.navigation.navigate(
          "FCatalogList",
          {catalogs: this.props.friend.catalogs,
                    uid: this.props.friend.uid,
                    username: this.props.friend.username}
        )}>
        <View style={card.icon}>
          <Image
            style={{width: 50, resizeMode: "contain",}}
            source={getAvatar(this.props.friend.avatar)}
          />
        </View>
        <View style={card.centerBox}>
          <Text style={std.text}> {this.props.friend.email} </Text>
        </View>
        <View style={card.icon}>
          <Icon
            color={"#a8aaaa"}
            name={"chevron-right"}
            size={30}
          />
        </View>
      </TouchableOpacity>
    );
  }

}
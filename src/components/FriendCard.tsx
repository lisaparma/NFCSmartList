import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Icon} from "react-native-elements";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute} from "react-navigation";

import {IFriend} from "../redux/IStore";
import {getAvatar} from "../../avatars/avatar";

import {card, def, std} from "../style";

interface FriendCardProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
  friend: IFriend;
}

export default class FriendCard extends Component<FriendCardProps> {

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
          <Text style={std.text} numberOfLines = { 1 }> {this.props.friend.email} </Text>
        </View>
        <View style={card.icon}>
          <Icon
            color={def.grey1}
            name={"chevron-right"}
            size={30}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
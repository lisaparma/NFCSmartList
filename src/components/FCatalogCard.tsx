import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {ICatalog} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";

import {std, card} from "../style";

interface CatalogCardProps {
  navigation: NavigationScreenProp<object>;
  catalog: ICatalog;
}

interface CatalogCardState {
  uid: string;
  like: boolean;
}

export default class FCatalogCard extends Component<CatalogCardProps, CatalogCardState> {

  constructor(props: CatalogCardProps) {
    super(props);
    this.state = {
      uid: this.props.navigation.getParam("uid"),
      like: false
    }
  }

  public render() {
    return (
      <TouchableOpacity
        style={[card.container, card.contCatal]}
        onPress={()=> this.props.navigation.navigate(
          "FCatalog",
          {name: this.props.catalog.name,
            uid: this.state.uid,
            cid: this.props.catalog.cid,
            items: this.props.catalog.items
          }
        )}>
        <View style={card.icon}>
          <Icon
            name={"assignment"}
            size={50}
          />
        </View>
        <View style={card.centerBox}>
          <Text style={[std.text, card.t1]}> {this.props.catalog.name} </Text>
          <Text style={[std.text, card.t2]}> {this.props.catalog.description} </Text>
        </View>
        <View style={card.icon}>
          {this.state.like &&
            <Icon
              color={"#a8aaaa"}
              name={"favorite"}
              size={30}
            />
          }
          {!this.state.like &&
          <Icon
            color={"#a8aaaa"}
            name={"favorite-border"}
            size={30}
          />
          }
        </View>
      </TouchableOpacity>
    );
  }
}

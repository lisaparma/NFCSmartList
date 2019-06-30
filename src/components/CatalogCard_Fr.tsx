import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute} from "react-navigation";

import {store} from "../App";
import Database from "../firebaseAPI/database";
import {ICatalog} from "../redux/IStore";

import {std, card, getColor, def, getIcon} from "../style";

interface CatalogCardProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
  catalog: ICatalog;
  uid: string;
}

interface CatalogCardState {
  uid: string;
}

export default class CatalogCard_Fr extends Component<CatalogCardProps, CatalogCardState> {

  private mUnsubscribeFromStore: any;

  constructor(props: CatalogCardProps) {
    super(props);
    this.state = {
      uid: this.props.navigation.getParam("uid"),
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
            name={getIcon(this.props.catalog.mod)}
            size={40}
            color={getColor(this.props.catalog.mod)}
          />
        </View>
        <View style={card.centerBox}>
          <Text style={[std.text, card.t1]} numberOfLines = { 1 }> {this.props.catalog.name} </Text>
          <Text style={[std.text, card.t2]}>
            Oggetti: {this.props.catalog.items? Object.keys(this.props.catalog.items).length : 0}
          </Text>
        </View>
        <Icon
          color={def.grey1}
          name={"chevron-right"}
          size={30}
        />
      </TouchableOpacity>
    );
  }

}

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {ICatalog} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";

import {std, card, getLabel, getColor} from "../style"

interface CatalogCardProps {
  navigation: NavigationScreenProp<object>;
  catalog: ICatalog;
}

interface CatalogCardState {
}

export default class CatalogCard extends Component<CatalogCardProps, CatalogCardState> {

  constructor(props: CatalogCardProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <TouchableOpacity
        style={[card.container, card.contCatal]}
        onPress={()=> this.props.navigation.navigate(
          "Catalog",
          {name: this.props.catalog.name,
            id: this.props.catalog.cid}
        )}>
        <View style={card.icon}>
          <Icon
            name={"assignment"}
            size={50}
            color={getColor(this.props.catalog.mod)}
          />
        </View>
        <View style={card.centerBox}>
          <View style={{flexDirection: "row"}}>
            {this.props.catalog.private &&
              <Icon
                iconStyle={styles.lock}
                color={"#a8aaaa"}
                name={"lock-outline"}
                size={20}
              />
            }
            <Text style={[std.text, card.t1]}>
              {this.props.catalog.name}
            </Text>
          </View>
          <Text style={[std.text, card.t2]}> {this.props.catalog.description} </Text>
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

const styles = StyleSheet.create({
  lock: {
    paddingRight: 5,
    paddingTop: 1,
  },

});

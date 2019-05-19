import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute} from "react-navigation";

import {ICatalog} from "../redux/IStore";

import {std, card, getColor, def, getIcon} from "../style"

interface CatalogCardProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
  catalog: ICatalog;
}

export default class CatalogCard extends Component<CatalogCardProps> {

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
            name={getIcon(this.props.catalog.mod)}
            size={40}
            color={getColor(this.props.catalog.mod)}
          />
        </View>
        <View style={card.centerBox}>
          <View style={{flexDirection: "row"}}>
            {this.props.catalog.private &&
              <Icon
                iconStyle={styles.lock}
                color={def.grey1}
                name={"lock-outline"}
                size={20}
              />
            }
            <Text style={[std.text, card.t1]}>
              {this.props.catalog.name}
            </Text>
          </View>
          <Text style={[std.text, card.t2]}>
            Oggetti: {Object.keys(this.props.catalog.items).length}
          </Text>
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

const styles = StyleSheet.create({
  lock: {
    paddingRight: 5,
    paddingTop: 1,
  },
});

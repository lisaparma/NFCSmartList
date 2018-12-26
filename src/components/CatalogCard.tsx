import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {ICatalog} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";

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
        style={styles.item}
        onPress={()=> this.props.navigation.navigate(
          "Catalog",
          {name: this.props.catalog.name,
            id: this.props.catalog.cid}
        )}>
        <Text> Name: {this.props.catalog.name} </Text>
        <Text> Description: {this.props.catalog.description} </Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#10A0E0',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderColor: "#87CEFA",
    borderWidth: 2,
    borderRadius: 30,
    margin: 10
  },
});

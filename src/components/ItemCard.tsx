import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {ICatalog, IItem} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";

interface ItemCardProps {
  navigation: NavigationScreenProp<object>;
  item: IItem;
  cid: string;
}

interface ItemCardState {
}

export default class ItemCard extends Component<ItemCardProps, ItemCardState> {

  constructor(props: ItemCardProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={()=> this.props.navigation.navigate(
          "DetailsItem",
          {item: this.props.item,
                    cid: this.props.cid}
        )}>
        <Text> Name: {this.props.item.name} </Text>
        <Text> Description: {this.props.item.description} </Text>
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

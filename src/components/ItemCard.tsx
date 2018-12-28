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
        style={styles.container}
        onPress={()=> {}}>
        <View>
          <Text> Name: {this.props.item.name} </Text>
          <Text> Description: {this.props.item.description} </Text>
        </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={()=> this.props.navigation.navigate(
            "DetailsItem",
            {item: this.props.item,
              cid: this.props.cid}
          )}
        >
          <Icon
            name={"info"}
            size={30}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: "#bcbdbe",
    borderWidth: 0.5,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: '#bcbdbe',
    shadowOpacity: 1.0,

  },
  icon: {
    padding: 10
  }
});

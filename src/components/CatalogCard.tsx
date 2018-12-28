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
        style={styles.container}
        onPress={()=> this.props.navigation.navigate(
          "Catalog",
          {name: this.props.catalog.name,
            id: this.props.catalog.cid}
        )}>
        <View style={styles.image}>
          <Icon
            name={"assignment"}
            size={50}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text1}> {this.props.catalog.name} </Text>
          <Text style={styles.text2}> {this.props.catalog.description} </Text>
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

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
        <View style={styles.centerBox}>
          <View style={styles.title}>
            {this.props.catalog.private &&
              <Icon
                iconStyle={styles.lock}
                color={"#a8aaaa"}
                name={"lock-outline"}
                size={20}
              />
            }
            <Text style={styles.text1}>
              {this.props.catalog.name}
            </Text>
          </View>
          <Text style={styles.text2}> {this.props.catalog.description} </Text>
        </View>
        <View style={styles.image}>
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
  container: {
    paddingVertical: 10,
    borderColor: "#87CEFA",
    borderWidth: 1,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    margin: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  image: {
    paddingHorizontal: 10
  },
  centerBox: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    flexDirection: "row",
  },
  lock: {
    paddingRight: 5,
    paddingTop: 1,
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

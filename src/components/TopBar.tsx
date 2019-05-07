import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import {Icon} from "react-native-elements";

import {store} from "../App";

import {def} from "../style";

interface TopBarProps {
  iconLeft?: string;
  onPressLeft?: any;
  title: string;
  iconRight?: string;
  onPressRight?: any;
}

export default class TopBar extends Component<TopBarProps> {

  public render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {
            (this.props.onPressLeft && !(this.props.iconLeft === "menu" && store.getState().user.os === "ios")) &&
            <TouchableOpacity
              style={styles.buttons}
              onPress={this.props.onPressLeft}>
              <Icon
                name={this.props.iconLeft}
                size={30}
                color={def.white}
              />
            </TouchableOpacity>
          }
          {
            (!this.props.onPressLeft || (this.props.iconLeft === "menu" && store.getState().user.os === "ios")) &&
              <View style={styles.buttons}/>
          }
          <View style={[Platform.OS !== "ios" && styles.textBox]}>
          <Text style={styles.text}>
            {this.props.title}
            </Text>
          </View>
          {
            (this.props.onPressRight && !(this.props.iconRight === "add" && store.getState().user.os !== "ios")) &&
            this.props.onPressRight &&
            <TouchableOpacity
              style={styles.buttons}
              onPress={this.props.onPressRight}>
              <Icon
                name={this.props.iconRight}
                size={30}
                color={def.white}
              />
            </TouchableOpacity>
          }
          {!this.props.onPressRight &&
            <View style={styles.buttons}/>
          }
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: def.theme1,
  },
  container: {
    flexDirection: "row",
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: def.theme1,
  },
  buttons: {
    paddingHorizontal: 15,
    width: 65
  },
  textBox: {
    flex: 1
  },
  text: {
    color: def.white,
    fontSize: 30,
    fontWeight: "bold",
    // fontFamily: "Yanone Kaffeesatz"
  }
});

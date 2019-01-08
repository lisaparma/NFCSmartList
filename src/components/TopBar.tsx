import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {store} from "../App";

interface TopBarProps {
  iconLeft?: string;
  onPressLeft?: any;
  title: string;
  iconRight?: string;
  onPressRight?: any;
}

interface TopBarState {
}

export default class TopBar extends Component<TopBarProps, TopBarState> {

  constructor(props: TopBarProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {
            this.props.onPressLeft &&
            <TouchableOpacity
              style={styles.buttons}
              onPress={this.props.onPressLeft}>
              <Icon
                name={this.props.iconLeft}
                size={30}
                color={"#FFFFF0"}
              />
            </TouchableOpacity>
          }
          {
            !this.props.onPressLeft &&
              <View style={styles.buttons}/>
          }
          <Text style={styles.text}>
            {this.props.title}
            </Text>
          {
            this.props.onPressRight &&
            <TouchableOpacity
              style={styles.buttons}
              onPress={this.props.onPressRight}>
              <Icon
                name={this.props.iconRight}
                size={30}
                color={"#FFFFF0"}
              />
            </TouchableOpacity>
          }
          {
            !this.props.onPressRight &&
            <View style={styles.buttons}/>
          }
        </View>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#10A0E0',
  },
  container: {
    flexDirection: "row",
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#10A0E0',
  },
  buttons: {
    paddingHorizontal: 15,
    width: 65
  },
  text: {
    color: "#FFFFF0",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Yanone Kaffeesatz"
  }
});

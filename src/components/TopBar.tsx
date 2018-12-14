import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";

interface TopBarProps {
  onPressLeft?: any;
  onPressRight?: any;
  title: string;
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
          {this.props.onPressLeft &&
            <TouchableOpacity
              onPress={this.props.onPressLeft}>
              <Icon name={"looks"}/>
            </TouchableOpacity>
          }
          <Text>{this.props.title}</Text>
          {this.props.onPressRight &&
            <TouchableOpacity
              onPress={this.props.onPressRight}>
              <Icon name={"looks"}/>
            </TouchableOpacity>
          }
        </View>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C0E1FF',
  },
  safeArea: {
    backgroundColor: '#C0E1FF',
  }
});

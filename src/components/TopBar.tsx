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
              style={styles.buttons}
              onPress={this.props.onPressLeft}>
              <Icon
                name={"chevron-left"}
                size={30}
                color={"#FFFFF0"}
              />
            </TouchableOpacity>
          }
          <Text style={styles.text}>
            {this.props.title}
            </Text>
          {this.props.onPressRight &&
            <TouchableOpacity
              style={styles.buttons}
              onPress={this.props.onPressRight}>
              <Icon
                name={"more-horiz"}
                size={30}
                color={"#FFFFF0"}
              />
            </TouchableOpacity>
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
    padding: 15,
  },
  text: {
    color: "#FFFFF0",
    fontSize: 20
  }
});

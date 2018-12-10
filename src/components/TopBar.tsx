import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";

interface TopBarProps {
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
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity
          onPress={this.props.onPressLeft}>
            <Icon name={"looks"}/>
          </TouchableOpacity>
          <Text>TopBar</Text>
        </View>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE4E1',
  },
});

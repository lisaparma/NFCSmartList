import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute} from "react-navigation";


import {std, card, getColor, def, getIcon} from "../style"

interface NullComponentProps {
  type: string
}

export default class NullComponent extends Component<NullComponentProps> {

  public render() {
    return (
      <View style={styles.card}>
      <Text style={styles.text}>Non hai ancora delle liste condivise contrassegnate come preferite.</Text>
      <Text style={styles.text}>

      </Text>
        <Icon
          color={def.white}
          name={"favorite-border"}
          size={30}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  }
});

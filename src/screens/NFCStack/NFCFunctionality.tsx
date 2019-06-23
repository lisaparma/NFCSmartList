import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Modal, ScrollView} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';

import {def, log, std} from "../../style";
import {store} from "../../App";
import {SettingsCard} from "../../components/SettingsCard";
import {Input} from "react-native-elements";

interface NFCFunctionalityProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface NFCFunctionalityState {
}

class NFCFunctionality extends Component<NFCFunctionalityProps, NFCFunctionalityState> {

  constructor(props: NFCFunctionalityProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <View style={styles.page}>
        <Text style={std.title}>NFC boh</Text>

        <View style={styles.box}>
          <SettingsCard
            icon={"add"}
            text={"Leggi tag"}
            navigation={this.props.navigation}
            page={"readTag"}/>
        </View>

        <View style={styles.box}>
          <SettingsCard
            icon={"add"}
            text={"Scrivi tag"}
            navigation={this.props.navigation}
            page={"writeTag"}/>
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  page: {
    backgroundColor: def.grey2,
    flex: 1,
  },
  titleBox: {
    fontSize: 16,
    color: def.grey0,
    paddingBottom: 5
  },
  dataBox: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  box: {
    marginVertical: 5,
  },
  card:{
    backgroundColor: def.white,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 0.3,
    borderColor: def.grey1,
    padding: 6,
  }
});

export default withNavigation(NFCFunctionality);

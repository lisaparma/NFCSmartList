import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Modal, ScrollView} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';

import {def, std} from "../../style";
import {store} from "../../App";
import {SettingsCard} from "../../components/SettingsCard";

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
      <View style={std.screen}>
        <Text style={std.title}>Formatta il tuo tag</Text>
        {(store.getState().user.os === "android" && store.getState().user.nfc)  &&
        <View style={styles.box}>
          <Text style={[std.text, styles.titleBox]}> NFC Manager</Text>
          <SettingsCard
            icon={"add"}
            text={"Formatta tag"}
            navigation={this.props.navigation}
            page={"NFCformat"}/>
          <SettingsCard
            icon={"add"}
            text={"Set id tag"}
            navigation={this.props.navigation}
            page={"NFCid"}/>
        </View>
        }
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

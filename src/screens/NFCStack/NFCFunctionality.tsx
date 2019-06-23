import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Modal, ScrollView, Platform, TouchableHighlight} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';

import {def, info, log, std} from "../../style";
import {store} from "../../App";
import {SettingsCard} from "../../components/SettingsCard";
import {Icon} from "react-native-elements";
import {goToSettings, isEnabled} from "../../NFCapi";

interface NFCFunctionalityProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface NFCFunctionalityState {
  modal: boolean
  enabled:  string | boolean
}

class NFCFunctionality extends Component<NFCFunctionalityProps, NFCFunctionalityState> {

  constructor(props: NFCFunctionalityProps) {
    super(props);
    this.state = {
      modal: false,
      enabled: "Impossibile verificarne lo stato"
    }
  }

  private stateNFC = () => {
    isEnabled()
      .then((log) => {
        if(log.toString() !== this.state.enabled) {
          this.setState({enabled: log.toString()});
        }
      })
  };

  public render() {
    this.stateNFC();
    return (
      <View style={styles.page}>
        <View style={[info.textBox, {marginBottom: 0, backgroundColor: def.white, padding: 10, paddingBottom: 20}]}>
          <Text style={[std.text, info.t1]}>Hardware NFC:</Text>
          <Text style={[std.text, info.t2]}>
            {this.state.enabled !== "Impossibile verificarne lo stato"?
              (this.state.enabled === "true")?
                "Disponibile"
                :
                "Non disponibile"
              :
              "Impossibile verificarne lo stato"
            }
          </Text>
        </View>

        <View style={styles.box}>
          <SettingsCard
            disabled={this.state.enabled !== "true" ? true : false}
            icon={"book"}
            text={"Leggi tag"}
            navigation={this.props.navigation}
            page={"readTag"}/>
        </View>
        <View style={styles.box}>
          <SettingsCard
            disabled={this.state.enabled !== "true" ? true : false}
            icon={"border-color"}
            text={"Scrivi tag"}
            navigation={this.props.navigation}
            page={"writeTag"}/>
        </View>

        <View style={styles.box}>
          <TouchableHighlight
            activeOpacity={0.3}
            underlayColor={def.theme2}
            onPress={() => this.setState({modal: true})}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  color={def.grey1}
                  name="settings"
                  size={30}
                />
                <Text style={std.text}>Vai alle impostazione dell'NFC</Text>
              </View>
              <Icon
                color={def.grey1}
                name="chevron-right"
                size={30}
              />
            </View>
          </TouchableHighlight>
        </View>

        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {this.setState({modal: false})}}
        >
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.textModal}>Vuoi uscire dall'applicazione e andare alle impostazione del tuo telefono?</Text>
              <View style={std.boxButton}>
                <TouchableOpacity
                  style={std.modalButton1}
                  onPress={() => {
                    this.setState({modal: false});
                    goToSettings()
                      .then(() => {console.log("Go to settings")})
                      .catch((err) => {console.log(err)})
                  }}>
                  <Text style={std.text}>Vai</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={std.modalButton2}
                  onPress={() => {
                    this.setState({modal: false});
                  }}>
                  <Text style={std.text}>Annulla</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  },
  item:{
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

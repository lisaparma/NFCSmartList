import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IAddCatalog} from "../../redux/action";
import {IStore, ICatalog} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";

interface CatalogListProps {
  navigation: NavigationScreenProp<object>;
}

interface CatalogListState {
  catalogs: {[id: string]: ICatalog}
}

class CatalogList extends Component<CatalogListProps, CatalogListState> {

  private mUnsubscribeFromStore: any;

  constructor(props: CatalogListProps) {
    super(props);
    this.state = {
      catalogs: {},
    }
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    const elements = Object.keys(this.state.catalogs)
      .map((element) => (
        <TouchableOpacity
          style={styles.item}
          key={this.state.catalogs[element].cid}
          onPress={()=> this.props.navigation.navigate(
            "Catalog",
            {name: this.state.catalogs[element].name,
                    id: this.state.catalogs[element].cid}
            )}>
          <Text> {this.state.catalogs[element].name} </Text>
        </TouchableOpacity>)
      );
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text> I tuoi cataloghi:</Text>
          {elements}
        </ScrollView>
      </View>
    );
  }

  private onStoreChange = () => {
    const currentState: IStore = store.getState();
    if(currentState.catalogs !== this.state.catalogs) {
      this.setState({
        catalogs: currentState.catalogs,
      });
    }
  }

  // private start() {
  //   NfcManager.start({
  //     onSessionClosedIOS: () => {
  //       NfcManager.unregisterTagEvent();
  //       console.warn('ios session closed');
  //     }
  //   })
  //   .then(result => {
  //         console.warn('start OK', result);
  //         this.setState({support: "true",});
  //     })
  //     .catch(error => {
  //         console.warn('device does not support nfc!');
  //         this.setState({support: "false",});
  //     })
  // }
  //
  // private write() {
  //     NfcManager.registerTagEvent(
  //     tag => {this.setState({xx:ByteParser.byteToString(tag.ndefMessage[0].payload)})},
  //     'Hold your device over the tag',
  //     false,
  //     )
  //   }
}

export default withNavigation(CatalogList);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderColor: "#87CEFA",
    borderWidth: 2,
    borderRadius: 30,
    margin: 10
  },
  plus: {
    padding: 20
  }

});

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IStore, ICatalog} from "../../redux/IStore";
import CatalogCard from "../../components/CatalogCard";

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
        <CatalogCard
          key={this.state.catalogs[element].cid}
          navigation={this.props.navigation}
          catalog={this.state.catalogs[element]}
        />
      ));
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}> I tuoi cataloghi:</Text>
          <View style={styles.elements}>
          {elements}
          </View>
        </ScrollView>
      </View>
    );
  }

  private onStoreChange = () => {
    const currentState: IStore = store.getState();
    if(currentState.catalogs !== this.state.catalogs) {
      this.setState({
        catalogs: {...currentState.catalogs},
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
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 25,
    color: "#0b6d99",
    fontFamily: "Yanone Kaffeesatz"

  },
  elements: {

  }

});

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, PixelRatio} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IStore, ICatalog} from "../../redux/IStore";
import CatalogCard from "../../components/CatalogCard";
import FCatalogCard from "../../components/FCatalogCard";

interface FCatalogListProps {
  navigation: NavigationScreenProp<object>;
}

interface FCatalogListState {
  catalogs: {[id: string]: ICatalog};
  uid: string
}

class FCatalogList extends Component<FCatalogListProps, FCatalogListState> {

  constructor(props: FCatalogListProps) {
    super(props);
    this.state = {
      catalogs: this.props.navigation.getParam("catalogs"),
      uid: this.props.navigation.getParam("uid"),
    }
  }

  public render() {
    const elements = Object.keys(this.state.catalogs)
      .map((element) => (
        <FCatalogCard
          key={this.state.catalogs[element].cid}
          navigation={this.props.navigation}
          uid={this.state.uid}
          catalog={this.state.catalogs[element]}
        />
      ));
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}> I suoi cataloghi pubblici:</Text>
          <View style={styles.elements}>
          {elements}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(FCatalogList);

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

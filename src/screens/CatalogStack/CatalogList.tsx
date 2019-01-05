import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, PixelRatio} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IStore, ICatalog} from "../../redux/IStore";
import CatalogCard from "../../components/CatalogCard";

import {std} from "../../style";

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
      <View style={std.screen}>
        <Text style={std.title}>
        I tuoi cataloghi:
      </Text>
      <ScrollView style={std.scroll}>
        {elements}
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
}

export default withNavigation(CatalogList);
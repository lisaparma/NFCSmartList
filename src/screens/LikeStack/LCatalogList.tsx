import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, PixelRatio} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IStore, ICatalog} from "../../redux/IStore";
import CatalogCard from "../../components/CatalogCard";

import {std} from "../../style";
import CatalogCard_Fr from "../../components/CatalogCard_Fr";
import CatalogCard_Like from "../../components/CatalogCard_Like";

interface LCatalogListProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface LCatalogListState {
  likes: {[id: string]: {uid: string, cid: string}}
}

class LCatalogList extends Component<LCatalogListProps, LCatalogListState> {

  private mUnsubscribeFromStore: any;

  constructor(props: LCatalogListProps) {
    super(props);
    this.state = {
      likes: store.getState().likes,
    }

  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    const elements = Object.keys(this.state.likes)
      .map((element) => (
        <CatalogCard_Like
          key={this.state.likes[element].cid}
          navigation={this.props.navigation}
          catalog={store.getState().friends[this.state.likes[element].uid].catalogs[element]}
          uid={this.state.likes[element].uid}
        />
      ));
    return (
      <View style={std.screen}>
        <Text style={std.title}>
        I tuoi preferiti:
      </Text>
      <ScrollView style={std.scroll}>
        {elements}
      </ScrollView>
      </View>
    );
  }

  private onStoreChange = () => {
    const currentState: IStore = store.getState();
    if(currentState.likes !== this.state.likes) {
      this.setState({
        likes: {...currentState.likes},
      });
    }
  }
}

export default withNavigation(LCatalogList);
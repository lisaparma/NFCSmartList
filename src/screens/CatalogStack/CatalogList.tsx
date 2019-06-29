import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, PixelRatio, TouchableOpacity, Platform} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IStore, ICatalog} from "../../redux/IStore";
import CatalogCard from "../../components/CatalogCard";

import {def, std} from "../../style";
import {Icon} from "react-native-elements";
import NullComponent from "../../components/NullComponent";

interface CatalogListProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
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
        <ScrollView style={std.scroll}>
          {elements.length > 0 ?
            elements
            :
            <NullComponent type={"catalogs"}/>
          }
        </ScrollView>
        {Platform.OS !== "ios" &&
          <TouchableOpacity
            style={std.floatingButton}
            onPress={() => {this.props.navigation.navigate("AddCatalog")}}
          >
            <Icon
              name="add"
              size={40}
              color={def.white}
            />
          </TouchableOpacity>
        }
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
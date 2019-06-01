import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';

import {ICatalog} from "../../redux/IStore";
import CatalogCard_Fr from "../../components/CatalogCard_Fr";
import {std} from "../../style";
import NullComponent from "../../components/NullComponent";

interface FCatalogListProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
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
        <CatalogCard_Fr
          key={this.state.catalogs[element].cid}
          navigation={this.props.navigation}
          uid={this.state.uid}
          catalog={this.state.catalogs[element]}
        />
      ));
    return (
      <View style={std.screen}>
        <ScrollView style={std.scroll}>
          {elements.length > 0 ?
            elements
            :
            <NullComponent type={"fr_catalogs"}/>
          }
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(FCatalogList);
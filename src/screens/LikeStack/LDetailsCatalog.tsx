import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';

import {ICatalog} from "../../redux/IStore";
import {std, info} from "../../style";


interface FDetailsCatalogProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface FDetailsCatalogState {
  catalog: ICatalog;
  name: string;
  description: string;
}

class LDetailsCatalog extends Component<FDetailsCatalogProps, FDetailsCatalogState> {

  constructor(props: FDetailsCatalogProps) {
    super(props);
    this.state = {
      catalog: this.props.navigation.getParam("catalog"),
      name: this.props.navigation.getParam("catalog").name,
      description: this.props.navigation.getParam("catalog").description,
    }
  }
  public render() {
    return (
      <View style={std.screen}>
        <Text style={std.title}> Informazioni catalogo:</Text>
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Nome:</Text>
            <Text style={[std.text, info.t2]}>{this.state.catalog.name}</Text>
          </View>
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Descrizione:</Text>
            <Text style={[std.text, info.t2]}>{this.state.catalog.description}</Text>
          </View>
      </View>
    );
  }
}

export default withNavigation(LDetailsCatalog);


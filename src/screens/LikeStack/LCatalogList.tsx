import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';

import {store} from "../../App";
import {IStore, ICatalog} from "../../redux/IStore";
import {std} from "../../style";
import CatalogCard_Like from "../../components/CatalogCard_Like";
import NullComponent from "../../components/NullComponent";

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
      .map((element) => {
        if(store.getState().friends[this.state.likes[element].uid].catalogs[element]) {
          return (
            <CatalogCard_Like
              key={element}
              navigation={this.props.navigation}
              catalog={store.getState().friends[this.state.likes[element].uid].catalogs[element]}
              uid={this.state.likes[element].uid}
            />
          );
        }
      });
    return (
      <View style={std.screen}>
        {/*<Text style={std.title}>*/}
          {/*I tuoi preferiti:*/}
        {/*</Text>*/}
      <ScrollView style={std.scroll}>
        {elements.length > 0 ?
          elements
          :
          <NullComponent type={"likes"}/>
        }
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
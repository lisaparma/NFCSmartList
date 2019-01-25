import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {ICatalog, IItem} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";

import {std, card, getColor} from "../style";
import {store} from "../App";
import Database from "../firebaseAPI/database";

interface CatalogCardProps {
  navigation: NavigationScreenProp<object>;
  catalog: ICatalog;
}

interface CatalogCardState {
  uid: string;
  like: boolean;
}

export default class CatalogCard_Fr extends Component<CatalogCardProps, CatalogCardState> {

  private mUnsubscribeFromStore: any;

  constructor(props: CatalogCardProps) {
    super(props);
    this.state = {
      uid: this.props.navigation.getParam("uid"),
      like: this.props.catalog.like,
    }
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    return (
      <TouchableOpacity
        style={[card.container, card.contCatal]}
        onPress={()=> this.props.navigation.navigate(
          "FCatalog",
          {name: this.props.catalog.name,
            uid: this.state.uid,
            cid: this.props.catalog.cid,
            items: this.props.catalog.items
          }
        )}>
        <View style={card.icon}>
          <Icon
            name={"assignment"}
            size={50}
            color={getColor(this.props.catalog.mod)}
          />
        </View>
        <View style={card.centerBox}>
          <Text style={[std.text, card.t1]}> {this.props.catalog.name} </Text>
          <Text style={[std.text, card.t2]}> {this.props.catalog.description} </Text>
        </View>
        <TouchableOpacity
          style={card.icon}
          onPress={this.check}>
          {this.state.like &&
            <Icon
              color={"#a8aaaa"}
              name={"favorite"}
              size={30}
            />
          }
          {!this.state.like &&
          <Icon
            color={"#a8aaaa"}
            name={"favorite-border"}
            size={30}
          />
          }
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  private check = () => {
    if(this.state.like) {
      store.dispatch({
        type: "CHECKOUT_LIKE",
        uid: this.state.uid,
        cid: this.props.catalog.cid,
      });
      Database.removeLike(this.props.catalog.cid);
    } else {
      store.dispatch({
        type: "CHECKIN_LIKE",
        uid: this.state.uid,
        cid: this.props.catalog.cid,
      });
      Database.addLike(this.state.uid, this.props.catalog.cid);
    }
  }

  private onStoreChange = () => {
    const currentState: ICatalog = store.getState().friends[this.state.uid].catalogs[this.props.catalog.cid];
    if (currentState.like !== this.state.like) {
      this.setState({
        like: currentState.like,
      });
    }
  }

}

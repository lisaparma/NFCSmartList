import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute} from "react-navigation";

import {ICatalog} from "../redux/IStore";
import {store} from "../App";
import Database from "../firebaseAPI/database";

import {std, card, getColor, def, getIcon} from "../style";

interface CatalogCardProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
  catalog: ICatalog;
  uid: string;
}

interface CatalogCardState {
  like: boolean;
}

export default class CatalogCard_Like extends Component<CatalogCardProps, CatalogCardState> {

  private mUnsubscribeFromStore: any;

  constructor(props: CatalogCardProps) {
    super(props);
    this.state = {
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
          "LCatalog",
          {name: this.props.catalog.name,
            uid: this.props.uid,
            cid: this.props.catalog.cid,
            items: this.props.catalog.items
          }
        )}>
        <View style={card.icon}>
          <Icon
            name={getIcon(this.props.catalog.mod)}
            size={40}
            color={getColor(this.props.catalog.mod)}
          />
        </View>
        <View style={card.centerBox}>
          <Text style={[std.text, card.t1]}> {this.props.catalog.name} </Text>
          <Text style={[std.text, card.t2]}> {store.getState().friends[this.props.uid].username} </Text>
        </View>
        <TouchableOpacity
          style={card.icon}
          onPress={this.check}>
          {this.state.like &&
            <Icon
              color={def.grey0}
              name={"star"}
              size={30}
            />
          }
          {!this.state.like &&
          <Icon
            color={def.yellow}
            name={"star-border"}
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
        uid: this.props.uid,
        cid: this.props.catalog.cid,
      });
      Database.removeLike(this.props.catalog.cid);
    } else {
      store.dispatch({
        type: "CHECKIN_LIKE",
        uid: this.props.uid,
        cid: this.props.catalog.cid,
      });
      Database.addLike(this.props.uid, this.props.catalog.cid);
    }
  }

  private onStoreChange = () => {
    const currentState: ICatalog = store.getState().friends[this.props.uid].catalogs[this.props.catalog.cid];
    if (currentState.like !== this.state.like) {
      this.setState({
        like: currentState.like,
      });
    }
  }
}

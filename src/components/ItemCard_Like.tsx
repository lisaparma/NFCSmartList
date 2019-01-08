import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {IItem} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";
import {store} from "../App";
import {IFrCheckInItem, IFrCheckOutItem} from "../redux/action";
import {card, std} from "../style";

interface ItemCardProps {
  navigation: NavigationScreenProp<object>;
  item: IItem;
  uid: string;
  cid: string;
}

interface ItemCardState {
  check: boolean;
}

export default class ItemCard_Like extends Component<ItemCardProps, ItemCardState> {

  private mUnsubscribeFromStore: any;

  constructor(props: ItemCardProps) {
    super(props);
    this.state = {
      check: store.getState().friends[this.props.uid].catalogs[this.props.cid].items[this.props.item.iid].check,
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
        style={[card.container, card.contItem]}
        onPress={this.check}>
        {!this.state.check &&
          <View style={card.icon}>
            <Icon
              name={"crop-din"}
              size={30}
            />
          </View>
        }
        {this.state.check &&
          <View style={card.icon}>
            <Icon
                name={"check"}
                size={30}
            />
          </View>
        }
        <View style={card.centerBox}>
          <Text style={std.text}> {this.props.item.name} </Text>
        </View>
        {(this.props.item.tag !== "") &&
          <View style={card.icon}>
            <Icon
              name={"nfc"}
              size={20}
              color={"#bcbdbe"}
            />
          </View>
        }
      </TouchableOpacity>
    );
  }

  private check = () => {
          console.log(this.props.uid, this.props.cid, this.props.item.iid)
    if(this.state.check) {
      store.dispatch<IFrCheckOutItem>({
        type: "FR_CHECKOUT_ITEM",
        uid: this.props.uid,
        cid: this.props.cid,
        iid: this.props.item.iid,
      });
    } else {
      store.dispatch<IFrCheckInItem>({
        type: "FR_CHECKIN_ITEM",
        uid: this.props.uid,
        cid: this.props.cid,
        iid: this.props.item.iid,
        name: this.props.item.name
      });
    }
  }

  private onStoreChange = () => {
    if(store.getState().friends[this.props.uid].catalogs[this.props.cid]
      && store.getState().friends[this.props.uid].catalogs[this.props.cid].items[this.props.item.iid]) {
      const currentState: IItem = store.getState().friends[this.props.uid].catalogs[this.props.cid].items[this.props.item.iid];
      if (currentState.check !== this.state.check) {
        this.setState({
          check: currentState.check,
        });
      }
    }
  }

}
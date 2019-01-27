import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {IItem} from "../redux/IStore";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute} from "react-navigation";
import {store} from "../App";
import {IFrCheckInItem, IFrCheckOutItem} from "../redux/action";
import {card, def, std} from "../style";

interface ItemCardProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
  item: IItem;
  uid: string;
  cid: string;
}

interface ItemCardState {
  check: boolean;
}

export default class ItemCard_Fr extends Component<ItemCardProps, ItemCardState> {

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
              color={def.grey1}
              name={"crop-din"}
              size={25}
            />
          </View>
        }
        {this.state.check &&
          <View style={card.icon}>
            <Icon
              color={def.theme1}
              name={"check"}
              size={25}
            />
          </View>
        }
        <View style={card.centerBox}>
          <Text style={[std.text, this.state.check && card.textCheck]}> {this.props.item.name} </Text>
        </View>
        {(this.props.item.tag !== "") &&
          <View style={card.icon}>
            <Icon
              name={"nfc"}
              size={20}
              color={def.grey1}
            />
          </View>
        }
      </TouchableOpacity>
    );
  }

  private check = () => {
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
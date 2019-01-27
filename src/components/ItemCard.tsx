import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {IItem} from "../redux/IStore";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute} from "react-navigation";
import {store} from "../App";
import {std, card, def} from "../style";

interface ItemCardProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
  item: IItem;
  cid: string;
}

interface ItemCardState {
  check: boolean;
}

export default class ItemCard extends Component<ItemCardProps, ItemCardState> {

  private mUnsubscribeFromStore: any;

  constructor(props: ItemCardProps) {
    super(props);
    this.state = {
      check: store.getState().catalogs[this.props.cid].items[this.props.item.iid].check,
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
          <Text style={[std.text, this.state.check && card.textCheck]}>{this.props.item.name} </Text>
        </View>
        <TouchableOpacity
          style={card.icon}
          onPress={()=> this.props.navigation.navigate(
            "DetailsItem",
            {item: this.props.item,
              cid: this.props.cid}
          )}
        >
          {(this.props.item.tag !== "") &&
          <Icon
            name={"nfc"}
            size={20}
            color={def.grey1}
          />
          }
          <Icon
            color={def.grey1}
            name={"info"}
            size={30}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  private check = () => {
    if(this.state.check) {
      store.dispatch({
        type: "CHECKOUT_ITEM",
        cid: this.props.cid,
        iid: this.props.item.iid,
      });
    } else {
      store.dispatch({
        type: "CHECKIN_ITEM",
        cid: this.props.cid,
        iid: this.props.item.iid,
        name: this.props.item.name
      });
    }
  }

  private onStoreChange = () => {
    if(store.getState().catalogs[this.props.cid] && store.getState().catalogs[this.props.cid].items[this.props.item.iid]) {
      const currentState: IItem = store.getState().catalogs[this.props.cid].items[this.props.item.iid];
      if (currentState.check !== this.state.check) {
        this.setState({
          check: currentState.check,
        });
      }
    }
  }
}
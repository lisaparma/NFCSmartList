import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {IItem} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";
import {store} from "../App";

interface ItemCardProps {
  navigation: NavigationScreenProp<object>;
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
        style={styles.container}
        onPress={this.check}>
        {!this.state.check &&
          <Icon
            name={"crop-din"}
            size={30}
          />
        }
        {this.state.check &&
          <Icon
              name={"check"}
              size={30}
          />
        }
        <View>
          <Text> {this.props.item.name} </Text>
        </View>
        <TouchableOpacity
          style={styles.icon}
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
            color={"#bcbdbe"}
          />
          }
          <Icon
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: "#bcbdbe",
    borderWidth: 0.5,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: '#bcbdbe',
    shadowOpacity: 1.0,
    elevation: 5

  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  }
});

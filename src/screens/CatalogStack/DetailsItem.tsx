import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import {store} from "../../App";
import {IEditItem, IRemoveItem} from "../../redux/action";
import {IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";

import {std} from "../../style";
import {info} from "../../style";


interface DetailsItemProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface DetailsItemState {
  item: IItem;
  cid: string;
  edit: boolean;
  name: string;
  description: string;
}

class DetailsItem extends Component<DetailsItemProps, DetailsItemState> {

  private mUnsubscribeFromStore: any;

  constructor(props: DetailsItemProps) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam("item"),
      cid: this.props.navigation.getParam("cid"),
      edit: false,
      name: this.props.navigation.getParam("item").name,
      description: this.props.navigation.getParam("item").description,
    }
  }

  public componentDidMount(): void {
    //this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    //this.mUnsubscribeFromStore();
  }

  public render() {
    return (
      <View style={std.screen}>
        <Text style={std.title}> Informazioni oggetto:</Text>
        {!this.state.edit &&
          <View>
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Nome:</Text>
              <Text style={[std.text, info.t2]}>{this.state.item.name}</Text>
            </View>
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Descrizione:</Text>
              <Text style={[std.text, info.t2]}>{this.state.item.description}</Text>
            </View>
            <TouchableOpacity
              style={std.button}
              onPress={()=>{this.setState({edit: true})}}>
              <Text style={std.textButton}>Modifica item</Text>
            </TouchableOpacity>
          </View>
        }
        {this.state.edit &&
          <View>
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Nome:</Text>
              <TextInput
                style={[std.text, info.t2]}
                onChangeText={text => this.setState({name: text})}>
                {this.state.name}
              </TextInput>
            </View>
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Descrizione:</Text>
              <TextInput
                style={[std.text, info.t2]}
                onChangeText={text => this.setState({description: text})}>
                {this.state.description}
              </TextInput>
            </View>

            <TouchableOpacity
              style={std.button}
              onPress={this.edit}>
              <Text style={std.textButton}>Fatto</Text>
            </TouchableOpacity>
          </View>
        }
        <TouchableOpacity
          style={[std.button, std.safeBut]}
          onPress={this.remove}>
          <Text style={std.textButton}>Elimina item</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private onStoreChange = () => {
    // const currentState: ICatalog = store.getState().catalogs[this.state.cid];
    // if(currentState.items !== this.state.items) {
    //   this.setState({
    //     items: {...currentState.items},
    //   });
    // }
  };

  private edit = () => {
    this.setState({edit: false});
    store.dispatch<IEditItem>({
      type: "EDIT_ITEM",
      cid: this.state.cid,
      iid: this.state.item.iid,
      name: this.state.name,
      description: this.state.description
    });
    Database.editItem(this.state.cid, this.state.item.iid, this.state.name, this.state.description);

  };

  private remove = () => {
    this.componentWillUnmount();
    store.dispatch<IRemoveItem>({
      type: "REMOVE_ITEM",
      cid: this.state.cid,
      iid: this.state.item.iid
    });
    Database.removeItem(this.state.cid, this.state.item.iid);
    this.props.navigation.dispatch(NavigationActions.back());
  };
}

export default withNavigation(DetailsItem);

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IEditItem, IRemoveItem} from "../../redux/action";
import {IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";

import {info} from "../../style";


interface DetailsItemProps {
  navigation: NavigationScreenProp<object>;
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
      <View style={info.container}>
        <Text style={info.title}> Informazioni oggetto:</Text>
        {!this.state.edit &&
          <View>
            <View style={info.textBox}>
              <Text style={info.text1}>Nome:</Text>
              <Text style={info.text2}>{this.state.item.name}</Text>
            </View>
            <View style={info.textBox}>
              <Text style={info.text1}>Descrizione:</Text>
              <Text style={info.text2}>{this.state.item.description}</Text>
            </View>
            <TouchableOpacity
              style={info.button}
              onPress={()=>{this.setState({edit: true})}}>
              <Text style={info.textButton}>Modifica item</Text>
            </TouchableOpacity>
          </View>
        }
        {this.state.edit &&
          <View>
            <View style={info.textBox}>
              <Text style={info.text1}>Nome:</Text>
              <TextInput
                style={info.text2}
                onChangeText={text => this.setState({name: text})}>
                {this.state.name}
              </TextInput>
            </View>
            <View style={info.textBox}>
              <Text style={info.text1}>Descrizione:</Text>
              <TextInput
                style={info.text2}
                onChangeText={text => this.setState({description: text})}>
                {this.state.description}
              </TextInput>
            </View>

            <TouchableOpacity
              style={info.button}
              onPress={this.edit}>
              <Text style={info.textButton}>Fatto</Text>
            </TouchableOpacity>
          </View>
        }
        <TouchableOpacity
          style={[info.button, {backgroundColor: "#e01038"}]}
          onPress={this.remove}>
          <Text style={info.textButton}>Elimina item</Text>
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

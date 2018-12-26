import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import {Icon} from "react-native-elements";
import {ICatalog, IItem} from "../redux/IStore";
import {NavigationScreenProp} from "react-navigation";
import {store} from "../App";
import {IAddItem} from "../redux/action";
import Database from "../firebaseAPI/database";

interface AddItemProps {
  cid: string;
}

interface AddItemState {
  name: string
}

export default class AddItem extends Component<AddItemProps, AddItemState> {

  constructor(props: AddItemProps) {
    super(props);
    this.state = {
      name: "",
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Item"
          onChangeText={text => this.setState({name: text})}
        >{this.state.name}</TextInput>
        <TouchableOpacity
          onPress={this.addItem}>
          <Text>Aggiungi item</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private addItem = () => {
    if(this.state.name !== "") {
      var uuid = require('react-native-uuid');
      const iid = uuid.v4();
      store.dispatch<IAddItem>({
        type: "ADD_ITEM",
        cid: this.props.cid,
        iid: iid,
        name: this.state.name,
        description: ""
      });
      Database.addItem(this.props.cid, iid, this.state.name, "");
      this.setState({name: ""});
    }
  };

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#10A0E0',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderColor: "#87CEFA",
    borderWidth: 2,
    borderRadius: 30,
    margin: 10
  },
});

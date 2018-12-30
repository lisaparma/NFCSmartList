import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import {Icon} from "react-native-elements";
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
        <Icon
          name={"add-circle-outline"}
          size={30}
          />
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
    padding: 10,
    borderColor: "#bcbdbe",
    borderWidth: 0.5,
    margin: 5,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: '#bcbdbe',
    shadowOpacity: 1.0,
    elevation: 5

  },
  icon: {
    padding: 10
  }
});

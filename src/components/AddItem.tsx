import React, {Component} from 'react';
import {View, TouchableOpacity, TextInput, Text, Modal} from 'react-native';
import {Icon} from "react-native-elements";

import {store} from "../App";
import {IAddItem} from "../redux/action";
import Database from "../firebaseAPI/database";

import {card, def, std} from "../style";
import {readOneNFC, unregisterNFC} from "../NFCapi";

interface AddItemProps {
  cid: string;
}

interface AddItemState {
  name: string;
  tag: string;
  modal: boolean;
  text: string;
}

export default class AddItem extends Component<AddItemProps, AddItemState> {

  constructor(props: AddItemProps) {
    super(props);
    this.state = {
      name: "",
      tag: "",
      modal: false,
      text: "",
    }
  }

  public render() {
    return (
      <View style={[card.container, card.contItem, {borderWidth: 1, borderRadius: 5}]}>
        <TouchableOpacity
          style={card.icon}
          onPress={this.addItem}>
          <Icon
            name={"add-circle-outline"}
            size={30}
            color={this.state.name === ""? def.grey1 : def.green}
          />
        </TouchableOpacity>
        <TextInput
          style={card.centerBox}
          placeholder="Item"
          onChangeText={text => this.setState({name: text})}>
          {this.state.name}
        </TextInput>
        {store.getState().user.nfc &&
          <TouchableOpacity
            style={card.icon}
            onPress={this.addTag}>
            <Icon
              name={"nfc"}
              size={30}
              color={this.state.tag !== "" ? def.green : def.grey1}
            />
          </TouchableOpacity>
        }
        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {this.setState({modal: false})}}>
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.text}>{this.state.text}</Text>
              <View style={std.boxButton}>
              {
                this.state.text === "Avvicina il tag..."?
                  <TouchableOpacity
                    style={std.modalButton2}
                    onPress={() => {
                      this.setState({modal: false});
                      unregisterNFC()
                        .then(log => console.log(log))
                        .catch(er => console.warn(er));
                    }}>
                    <Text style={std.text}>Annulla</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    style={std.modalButton1}
                    onPress={() => {
                      this.setState({modal: false});
                    }}>
                    <Text style={std.text}>Ok</Text>
                  </TouchableOpacity>
              }
              </View>
            </View>
          </View>
        </Modal>
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
        description: "",
        tag: this.state.tag,
      });
      Database.addItem(this.props.cid, iid, this.state.name, "", this.state.tag);
      this.setState({name: "", tag: ""});
    }
  };

  private addTag = () => {
    this.setState({modal: true, text: "Avvicina il tag..."});
    readOneNFC()
      .then((tag) => {
        this.setState({tag: tag.id, text: "Tag associato!"});
        console.log(this.state.tag);
      })
      .catch(er => console.error(er));
  }
}
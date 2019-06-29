import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, ScrollView, Modal} from 'react-native';
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
import {def, std} from "../../style";
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
  nfc: string | null;
  modal: boolean;
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
      nfc: this.props.navigation.getParam("item").tag? this.props.navigation.getParam("item").tag : null,
      modal: false
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
        <ScrollView>
        {!this.state.edit ?
          <View>
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Nome:</Text>
              <Text style={[std.text, info.t2]}>{this.state.item.name}</Text>
            </View>
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Descrizione:</Text>
              { this.state.item.description === ""?
                <Text style={[std.text, info.t2, {color: def.grey1}]}>Nessuna descrizione</Text>
                :
                <Text style={[std.text, info.t2]}>{this.state.item.description}</Text>
              }
            </View>
            { this.state.nfc &&
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Tag NFC:</Text>
              <Text style={[std.text, info.t2]}>{this.state.nfc}</Text>
            </View>
            }
            <TouchableOpacity
              style={std.button}
              onPress={()=>{this.setState({edit: true})}}>
              <Text style={std.textButton}>Modifica</Text>
            </TouchableOpacity>
          </View>
        :
          <View>
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Nome:</Text>
              <TextInput
                style={[std.text, info.t2, info.input]}
                onChangeText={text => this.setState({name: text})}>
                {this.state.name}
              </TextInput>
            </View>
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Descrizione:</Text>
              <TextInput
                style={[std.text, info.t2, info.input]}
                onChangeText={text => this.setState({description: text})}
                multiline={true}
              >
                {this.state.description}
              </TextInput>
            </View>
            { this.state.nfc &&
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Tag NFC:</Text>
              <Text style={[std.text, info.t2]}>{this.state.nfc}</Text>
            </View>
            }

            <TouchableOpacity
              style={std.button}
              onPress={this.edit}>
              <Text style={std.textButton}>Fatto</Text>
            </TouchableOpacity>
          </View>
        }
        <TouchableOpacity
          style={[std.button, std.safeBut]}
          onPress={() => this.setState({modal: true})}
          >
          <Text style={std.textButton}>Elimina</Text>
        </TouchableOpacity>
        </ScrollView>
        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {this.setState({modal: false})}}
        >
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.textModal}>Sei sicuro di voler eliminare l'oggetto?</Text>
              <View style={std.boxButton}>
                <TouchableOpacity
                  style={[std.modalButton1]}
                  onPress={() => {
                    this.setState({modal: false});
                    this.remove();
                  }}>
                  <Text style={std.text}>Elimina</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={std.modalButton2}
                  onPress={() => {
                    this.setState({modal: false});
                  }}>
                  <Text style={std.text}>Annulla</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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

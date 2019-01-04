import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Switch} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IEditCatalog, IEditItem, IRemoveCatalog, IRemoveItem} from "../../redux/action";
import {ICatalog, IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";

import {info} from "../../style";

interface DetailsCatalogProps {
  navigation: NavigationScreenProp<object>;
}

interface DetailsCatalogState {
  catalog: ICatalog;
  edit: boolean;
  name: string;
  description: string;
  private: boolean
}

class DetailsCatalog extends Component<DetailsCatalogProps, DetailsCatalogState> {

  private mUnsubscribeFromStore: any;

  constructor(props: DetailsCatalogProps) {
    super(props);
    this.state = {
      catalog: this.props.navigation.getParam("catalog"),
      edit: false,
      name: this.props.navigation.getParam("catalog").name,
      description: this.props.navigation.getParam("catalog").description,
      private: this.props.navigation.getParam("catalog").private
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
        <Text style={info.title}> Informazioni catalogo:</Text>
        {!this.state.edit &&
          <View>
            <View style={info.textBox}>
              <Text style={info.text1}>Nome:</Text>
              <Text style={info.text2}>{this.state.catalog.name}</Text>
            </View>
            <View style={info.textBox}>
              <Text style={info.text1}>Descrizione:</Text>
              <Text style={info.text2}>{this.state.catalog.description}</Text>
            </View>
            <View style={info.textBox}>
              <Text style={info.text1}>Privato:</Text>
              <View style={info.switch}>
                <Switch
                  value={this.state.private}
                  disabled
                />
              </View>
            </View>
            <TouchableOpacity
              style={info.button}
              onPress={()=>{this.setState({edit: true})}}>
              <Text style={info.textButton}>Modifica catalog</Text>
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

          <View style={info.textBox}>
            <Text style={info.text1}>Privato:</Text>
            <View style={info.switch}>
              <Switch
                value={this.state.private}
                onValueChange={()=>{this.setState({private: !this.state.private})}}
              />
            </View>
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
    store.dispatch<IEditCatalog>({
      type: "EDIT_CATALOG",
      cid: this.state.catalog.cid,
      name: this.state.name,
      description: this.state.description,
      private: this.state.private
    });
    Database.editCatalog(this.state.catalog.cid, this.state.name, this.state.description, this.state.private);

  };

  private remove = () => {
    this.componentWillUnmount();
    const cid = this.state.catalog.cid;
    store.dispatch<IRemoveCatalog>({
      type: "REMOVE_CATALOG",
      cid: cid
    });
    Database.removeCatalog(cid);
    this.props.navigation.navigate("CatalogList");
  };
}

export default withNavigation(DetailsCatalog);


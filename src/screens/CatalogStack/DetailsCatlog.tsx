import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import { Switch } from 'react-native-switch';

import {store} from "../../App";
import {IEditCatalog, IRemoveCatalog} from "../../redux/action";
import {ICatalog} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";
import {std} from "../../style";
import {info} from "../../style";

interface DetailsCatalogProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
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
      <View style={std.screen}>
        <Text style={std.title}> Informazioni catalogo:</Text>
        <ScrollView>
          {!this.state.edit ?
            <View>
              <View style={info.textBox}>
                <Text style={[std.text, info.t1]}>Nome:</Text>
                <Text style={[std.text, info.t2]}>{this.state.catalog.name}</Text>
              </View>
              <View style={info.textBox}>
                <Text style={[std.text, info.t1]}>Descrizione:</Text>
                <Text style={[std.text, info.t2]}>{this.state.catalog.description}</Text>
              </View>
              <View style={info.textBox}>
                <Text style={[std.text, info.t1]}>Sicurezza:</Text>
                <View style={info.switch}>
                  { this.state.private ?
                    <Text style={[std.text, info.t2]}>Privato</Text>
                    :
                    <Text style={[std.text, info.t2]}>Pubblico</Text>
                  }
                  <Switch
                    value={this.state.private}
                    disabled
                  />
                </View>
              </View>
              <TouchableOpacity
                style={std.button}
                onPress={()=>{this.setState({edit: true})}}>
                <Text style={std.textButton}>Modifica catalog</Text>
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
                onChangeText={text => this.setState({description: text})}>
                {this.state.description}
              </TextInput>
            </View>

            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Sicurezza:</Text>
              <View style={info.switch}>
                { this.state.private ?
                  <Text style={[std.text, info.t2]}>Privato</Text>
                  :
                  <Text style={[std.text, info.t2]}>Pubblico</Text>
                }
                <Switch
                  value={this.state.private}
                  onValueChange={()=>{this.setState({private: !this.state.private})}}
                />
              </View>
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
        </ScrollView>
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


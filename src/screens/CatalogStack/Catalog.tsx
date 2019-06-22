import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity, Modal,
} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IRemoveCatalog} from "../../redux/action";
import {ICatalog, IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";
import ItemCard from "../../components/ItemCard";
import AddItem from "../../components/AddItem";
import {Icon} from "react-native-elements";
import NfcManager, {ByteParser} from "react-native-nfc-manager";

import {std} from "../../style";
import NullComponent from "../../components/NullComponent";
import {readOneNFC, unregisterNFC} from "../../NFCapi";

interface CatalogsProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface CatalogsState {
  items: {[id: string]: IItem};
  cid: string;
  check: boolean;
  modal: boolean;
}

class Catalogs extends Component<CatalogsProps, CatalogsState> {

  private mUnsubscribeFromStore: any;

  constructor(props: CatalogsProps) {
    super(props);
    const cid = this.props.navigation.getParam("id");
    this.state = {
      items: store.getState().catalogs[cid].items? {...store.getState().catalogs[cid].items} : {},
      cid: cid,
      check: false,
      modal: false,
    }
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    const elements = Object.keys(this.state.items)
      .map((element) => (
        <ItemCard
          key={this.state.items[element].iid}
          navigation={this.props.navigation}
          item={this.state.items[element]}
          cid={this.state.cid}/>)
      );
    return (
      <View style={{flex: 1,}}>
        <View style={std.screen}>
          {/*<Text style={std.title}>*/}
            {/*I tuoi item:*/}
          {/*</Text>*/}
          <View style={std.list}>
            <ScrollView style={std.scroll}>
              {elements.length > 0 ?
                elements
                :
                <NullComponent type={"items"}/>
              }
            </ScrollView>
            {
              this.state.check?
                <TouchableOpacity
                  style={std.button}
                  onPress={() => {
                    this.setState({check: false});
                    unregisterNFC()
                      .then(log => console.log(log))
                      .catch(er => console.warn(er));}}>
                  <Text style={std.textButton}>Annulla</Text>
                </TouchableOpacity>
                :
                <AddItem cid={this.state.cid}/>
            }
          </View>
        </View>
        {this.props.navigation.getParam("menu") &&
          <View style={std.DDScreen}>
            <View style={std.DDmenu}>
              {store.getState().user.nfc &&
                <TouchableOpacity
                  style={std.DDitem}
                  onPress={() => {
                    this.NFCheck();
                    this.props.navigation.setParams({"menu": false})
                  }}>
                  <Text style={std.text}>
                    NFC Check
                  </Text>
                </TouchableOpacity>
              }
              <TouchableOpacity
                style={std.DDitem}
                onPress={()=> {
                  this.props.navigation.navigate(
                  "DetailsCatalog",
                  {catalog: store.getState().catalogs[this.state.cid]});
                  this.props.navigation.setParams({"menu": false});
                }}>
                <Text style={std.text}>
                    Informazioni
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={std.DDitem}
                onPress={() => this.setState({modal: true})}
              >
                <Text style={[std.text, std.warningText]}>
                    Elimina catalogo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={std.DDitem}
                  onPress={()=>{this.props.navigation.setParams({"menu": false})}}>
                  <Icon
                      name={"keyboard-arrow-up"}
                      size={30}
                  />
              </TouchableOpacity>
            </View>
          </View>
        }
        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {this.setState({modal: false})}}
        >
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.text}>Sei sicuro di voler eliminare il catalogo?</Text>
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
    const currentState: ICatalog = store.getState().catalogs[this.state.cid];
    if(currentState && (currentState.items !== this.state.items)) {
      this.setState({
        items: {...currentState.items},
      });
    }
  };

  private checkOne(tag: string) {
    for (let item in this.state.items) {
      if(this.state.items[item].tag === tag) {
        store.dispatch({
          type: "CHECKIN_ITEM",
          cid: this.state.cid,
          iid: this.state.items[item].iid,
          name: this.state.items[item].name
        });
      }
    }
  }

  private NFCheck() {
    this.setState({check: true});
    readOneNFC()
      .then((tag) => {
        this.checkOne(tag.id);
        this.NFCheck();
      })
      .catch(er => console.error(er));
  }


  private remove = () => {
    this.componentWillUnmount();
    const cid = this.state.cid;
    store.dispatch<IRemoveCatalog>({
      type: "REMOVE_CATALOG",
      cid: cid
    });
    Database.removeCatalog(cid);
    this.props.navigation.navigate("CatalogList");
  };
}

export default withNavigation(Catalogs);

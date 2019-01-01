import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IRemoveCatalog} from "../../redux/action";
import {ICatalog, IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";
import ItemCard from "../../components/ItemCard";
import AddItem from "../../components/AddItem";
import {Icon} from "react-native-elements";
import NfcManager, {ByteParser} from "react-native-nfc-manager";

interface CatalogsProps {
  navigation: NavigationScreenProp<object>;
}

interface CatalogsState {
  items: {[id: string]: IItem};
  cid: string;
}

class Catalogs extends Component<CatalogsProps, CatalogsState> {

  private mUnsubscribeFromStore: any;

  constructor(props: CatalogsProps) {
    super(props);
    const cid = this.props.navigation.getParam("id");
    this.state = {
      items: store.getState().catalogs[cid].items? {...store.getState().catalogs[cid].items} : {},
      cid: cid,
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
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.text}> I tuoi item:</Text>
          {elements}
        </ScrollView>

        <AddItem cid={this.state.cid}/>

        {
          this.props.navigation.getParam("menu") &&
          <View
            style={styles.dropdown}>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.itemMenu}
                onPress={()=>{
                  this.NFCheck();
                  this.props.navigation.setParams({"menu": false})}}>
                <Text style={styles.textMenu}>
                    NFC Check
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.itemMenu}
                onPress={()=> {
                  this.props.navigation.navigate(
                  "DetailsCatalog",
                  {catalog: store.getState().catalogs[this.state.cid]});
                  this.props.navigation.setParams({"menu": false});
                }}>
                <Text style={styles.textMenu}>
                    Informazioni
                </Text>
              </TouchableOpacity>
                <TouchableOpacity
                  style={styles.itemMenu}
                  onPress={this.remove}>
                  <Text style={[styles.textMenu, {color:"#e01038"}]}>
                      Elimina catalogo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.closeMenu}
                    onPress={()=>{this.props.navigation.setParams({"menu": false})}}>
                    <Icon
                        name={"keyboard-arrow-up"}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
          </View>
        }
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
    NfcManager.start()
    .then(() => {
      NfcManager.registerTagEvent(
        tag => {
          this.checkOne(ByteParser.byteToString(tag.ndefMessage[0].payload));
        },
        'Hold your device over the tag',
        false,
      )
    })
    .catch(error => {
      console.warn(error);
    })
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll:{
    padding: 10
  },
  text: {
    fontSize: 25,
    color: "#0b6d99",
    fontFamily: "Yanone Kaffeesatz"
  },
  dropdown: {
    flex: 1,
    position: "absolute",
    alignContent: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: "100%",
    height: "100%",
    paddingHorizontal: 1
  },
  menu: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    paddingHorizontal: 10
  },
  itemMenu:{
    padding: 5,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#0b6d99",
  },
  textMenu: {
    fontSize: 20,
    fontFamily: "Yanone Kaffeesatz"
  },
  closeMenu: {
    paddingVertical: 5
  }
});

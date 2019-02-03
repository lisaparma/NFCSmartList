import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';

import {store} from "../../App";
import {IItem} from "../../redux/IStore";
import {Icon} from "react-native-elements";
import NfcManager, {ByteParser} from "react-native-nfc-manager";
import {std} from "../../style";
import ItemCard_Like from "../../components/ItemCard_Like";

interface CatalogsProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface CatalogsState {
  items: {[id: string]: IItem};
  uid: string;
  cid: string;
  check: boolean;
}

class LCatalog extends Component<CatalogsProps, CatalogsState> {

  constructor(props: CatalogsProps) {
    super(props);
    const cid = this.props.navigation.getParam("cid");
    this.state = {
      items: this.props.navigation.getParam("items")? this.props.navigation.getParam("items") : {},
      cid: cid,
      uid: this.props.navigation.getParam("uid"),
      check: false,
    }
  }

  public render() {
    const elements = Object.keys(this.state.items)
      .map((element) => (
        <ItemCard_Like
          key={this.state.items[element].iid}
          navigation={this.props.navigation}
          item={this.state.items[element]}
          uid={this.state.uid}
          cid={this.state.cid}/>)
      );
    return (
      <View style={{flex: 1}}>
        <View style={std.screen}>
          <Text style={std.title}>
            I suoi item:
          </Text>
          <ScrollView style={std.scroll}>
            {elements}
          </ScrollView>
          {
            this.state.check &&
            <TouchableOpacity
              style={std.button}
              onPress={() => {
                this.setState({check: false})
                console.warn("unregister");
                NfcManager.unregisterTagEvent();
                console.warn("Stop");
                NfcManager.stop()}}>
              <Text style={std.textButton}>Annulla</Text>
            </TouchableOpacity>
          }
        </View>
        {
          this.props.navigation.getParam("menu") &&
          <View style={std.DDScreen}>
            <View style={std.DDmenu}>
              <TouchableOpacity
                style={std.DDitem}
                onPress={()=>{
                  this.NFCheck();
                  this.props.navigation.setParams({"menu": false})}}>
                <Text style={std.text}>
                    NFC Check
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={std.DDitem}
                onPress={()=> {
                  this.props.navigation.navigate(
                  "LDetailsCatalog",
                  {catalog: store.getState().friends[this.state.uid].catalogs[this.state.cid]});
                  this.props.navigation.setParams({"menu": false});
                }}>
                <Text style={std.text}>
                    Informazioni
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
      </View>
    );
  }

  private checkOne(tag: string) {
    for (let item in this.state.items) {
      if(this.state.items[item].tag === tag) {
        store.dispatch({
          type: "FR_CHECKIN_ITEM",
          uid: this.state.uid,
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
      this.setState({check: true});
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
}

export default withNavigation(LCatalog);
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';

import {def, std} from "../style";
import {getAvatar} from "../../avatars/avatar";
import {DrawerItems} from "react-navigation";
import {IUser} from "../redux/IStore";

interface DrawerNavigatorProps {
  navProps: any;
  user: IUser;
}

export default class DrawerNavigator extends Component<DrawerNavigatorProps> {

  public render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <ScrollView>
          <View style={styles.box}>
            <Image
              style={styles.pic}
              source={require("../../assets/dream.png")}/>
            <View style={{padding: 30}}>
              <View style={{paddingVertical: 10}}>
                  <Image
                    style={{width: 100, height: 100, opacity: 1}}
                    source={getAvatar(this.props.user.avatar)}
                  />
                </View>
                <Text style={std.title}>
                  {this.props.user.username}
                </Text>
                <Text style={std.text}>
                  {this.props.user.email}
                </Text>
            </View>
          </View>
          <DrawerItems {...this.props.navProps}
             getLabel = {(scene) => (
               <View style={{paddingVertical: 20}}>
                 <Text>{this.props.navProps.getLabel(scene)}</Text>
               </View>
             )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: def.theme1,
  },
  box: {
    borderBottomWidth: 2,
    borderBottomColor: def.theme1,
  },
  pic: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.3,
    width: "100%",
    height: "100%",
  }
});

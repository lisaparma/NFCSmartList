import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { withNavigation } from 'react-navigation';
import Auth from "../firebaseAPI/auth";

interface CatalogsProps {
}

interface CatalogsState {
}

class Catalogs extends Component<CatalogsProps, CatalogsState> {

  constructor(props: CatalogsProps) {
    super(props);
    this.state = {
    }
  }
  static navigationOptions = {
    drawerLabel: 'Home',
  };


  public render() {
    return (
      <View style={styles.container}>
        <Text>Cataloghi</Text>
        <Button
          title={"Drawable navigator"}
          onPress={()=>{}}>
          Esci
        </Button>
        <Button
          title={"Esci"}
          onPress={()=>{Auth.logout()}}>
          Esci
        </Button>
      </View>
    );
  }

}

export default withNavigation(Catalogs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 1000,
    backgroundColor: '#F5FCFF',
  },

});

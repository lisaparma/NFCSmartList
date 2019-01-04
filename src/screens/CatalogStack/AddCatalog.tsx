import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Switch} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IAddCatalog} from "../../redux/action";
import Database from "../../firebaseAPI/database";


interface AddCatalogProps {
  navigation: NavigationScreenProp<object>;
}

interface AddCatalogState {
  name: string;
  description: string;
  private: boolean;
}

class AddCatalog extends Component<AddCatalogProps, AddCatalogState> {

  constructor(props: AddCatalogProps) {
    super(props);
    this.state = {
      name: null,
      description: null,
      private: true,
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Aggiungi un catalogo:</Text>
        <View style={styles.textBox}>
          <Text style={styles.text}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="name"
            onChangeText={text => this.setState({name: text})}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>Descrizione:</Text>
          <TextInput
            style={styles.input}
            placeholder="description"
            onChangeText={text => this.setState({description: text})}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>Privato:</Text>
          <View style={styles.switch}>
            <Switch
              value={this.state.private}
              onValueChange={()=>{this.setState({private: !this.state.private})}}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.add}>
          <Text style={styles.textButton}>Aggiungi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private add = () => {
    if(this.state.name !== null && this.state.description !== null) {
      var uuid = require('react-native-uuid');
      const id = uuid.v4();
      store.dispatch<IAddCatalog>({
        type: "ADD_CATALOG",
        cid: id,
        name: this.state.name,
        description: this.state.description,
        class: "standard",
        private: this.state.private
      });
      Database.addCatalog(id, this.state.name, this.state.description, this.state.private);
      this.props.navigation.dispatch(NavigationActions.back());
      this.props.navigation.navigate("Catalog", {name: this.state.name, id: id});
    }
  }
}

export default withNavigation(AddCatalog);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 25,
    color: "#0b6d99",
    fontFamily: "Yanone Kaffeesatz"
  },
  input: {
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: "Yanone Kaffeesatz",
  },
  textBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#a8aaaa",
    paddingVertical: 10,
    paddingTop: 20
  },
  text: {
    fontSize: 20,
    fontFamily: "Yanone Kaffeesatz",
    color: "#a8aaaa",
  },
  switch: {
    paddingLeft: 15
  },
  button: {
    padding: 5,
    marginHorizontal: "25%",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: '#0b6d99',
    width: "50%",
    paddingVertical: 10,
    borderRadius: 3,
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFF0",
    fontFamily: "Yanone Kaffeesatz"
  },
});

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IEditCatalog, IEditItem, IRemoveCatalog, IRemoveItem} from "../../redux/action";
import {ICatalog, IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";


interface DetailsCatalogProps {
  navigation: NavigationScreenProp<object>;
}

interface DetailsCatalogState {
  catalog: ICatalog;
  edit: boolean;
  name: string;
  description: string;
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
      <View style={styles.container}>
        {!this.state.edit &&
          <View>
            <Text>{this.state.catalog.name}</Text>
            <Text> {this.state.catalog.description}</Text>
          </View>
        }
        {this.state.edit &&
        <View>
          <TextInput
            onChangeText={text => this.setState({name: text})}>
            {this.state.name}
          </TextInput>
          <TextInput
            onChangeText={text => this.setState({description: text})}>
            {this.state.description}
          </TextInput>
        </View>
        }
        {!this.state.edit &&
        < TouchableOpacity
          style={styles.plus}
          onPress={()=>{this.setState({edit: true})}}>
          <Text>Modifica catalog</Text>
          </TouchableOpacity>
        }
        {this.state.edit &&
        < TouchableOpacity
          style={styles.plus}
          onPress={this.edit}>
          <Text>Fatto</Text>
        </TouchableOpacity>
        }

        <TouchableOpacity
          style={styles.plus}
          onPress={this.remove}>
          <Text>Elimina item</Text>
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
      description: this.state.description
    });
    Database.editCatalog(this.state.catalog.cid, this.state.name, this.state.description);

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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderColor: "#87CEFA",
    borderWidth: 2,
    borderRadius: 30,
    margin: 10
  },
  plus: {
    padding: 20
  },
  dropdown: {
    height: 50,
    width: "100%",
    position: "absolute",
    alignItems: "flex-end",
  },
  menu: {
    backgroundColor: "#87CEFA",
    width: 100
  }

});

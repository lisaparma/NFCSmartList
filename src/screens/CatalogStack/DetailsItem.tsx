import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IEditItem, IRemoveItem} from "../../redux/action";
import {IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";


interface DetailsItemProps {
  navigation: NavigationScreenProp<object>;
}

interface DetailsItemState {
  item: IItem;
  cid: string;
  edit: boolean;
  name: string;
  description: string;
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
            <Text>{this.state.item.name}</Text>
            <Text> {this.state.item.description}</Text>
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
          <Text>Modifica item</Text>
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

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IFriend, IStore} from "../../redux/IStore";
import FriendCard from "../../components/FriendCard";

interface FriendsProps {
  navigation: NavigationScreenProp<object>;
}

interface FriendsState {
  friends: {[uid: string]: IFriend}
}

class Friends extends Component<FriendsProps, FriendsState> {

  private mUnsubscribeFromStore: any;

  constructor(props: FriendsProps) {
    super(props);
    this.state = {
      friends: store.getState().friends,
    }
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    const elements = Object.keys(this.state.friends)
      .map((element) => (
        <FriendCard
          key={this.state.friends[element].uid}
          navigation={this.props.navigation}
          friend={this.state.friends[element]}
        />));
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}> I tuoi amici:</Text>
          <View>
            {elements}
          </View>
        </ScrollView>
      </View>
    );
  }

  private onStoreChange = () => {
    const currentState: IStore = store.getState();
    if(currentState.friends !== this.state.friends) {
      this.setState({
        friends: {...currentState.friends},
      });
    }
  };

}

export default withNavigation(Friends);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    color: "#0b6d99",
    fontFamily: "Yanone Kaffeesatz"

  },

});

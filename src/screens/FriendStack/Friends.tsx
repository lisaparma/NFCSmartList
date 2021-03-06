import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Platform} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IFriend, IStore} from "../../redux/IStore";
import FriendCard from "../../components/FriendCard";
import {def, std} from "../../style";
import {Icon} from "react-native-elements";
import NullComponent from "../../components/NullComponent";

interface FriendsProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
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
      <View style={std.screen}>
        <ScrollView style={std.scroll}>
          {elements.length > 0 ?
            elements
            :
            <NullComponent type={"friends"}/>
          }
        </ScrollView>
        {Platform.OS !== "ios" &&
        <TouchableOpacity
          style={std.floatingButton}
          onPress={() => {this.props.navigation.navigate("AddFriend")}}
        >
          <Icon
            name="add"
            size={40}
            color={def.white}
          />
        </TouchableOpacity>
        }
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
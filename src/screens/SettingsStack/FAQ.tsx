import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  NavigationActions, NavigationParams, NavigationScreenProp, NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import {def, std} from "../../style";

interface FAQProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

class FAQ extends Component<FAQProps> {

  public render() {
    return (
      <ScrollView style={std.screen}>
        <Text style={[std.title]}>srger</Text>
        <Text style={[std.text]}>
          dgs
        </Text>

        <View style={styles.box}>
          <Text style={[std.text, {fontSize: 25, color: def.theme1}]}>?</Text>
          <Text style={[std.text]}>
            xcxv{"\n"}{"\n"}
          </Text>
        </View>



      </ScrollView>
    );
  }
}

export default withNavigation(FAQ);


const styles = StyleSheet.create({
  box: {
    paddingTop: 10
  }
});

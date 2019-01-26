import * as React from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Icon} from "react-native-elements";
import {def, std} from '../style';
import {NavigationScreenProp} from "react-navigation";

interface ISettingsItemProps {
  navigation: NavigationScreenProp<object>;
  icon: string,
  text: string,
  page: string,
}

export class SettingsCard extends React.Component<ISettingsItemProps> {

  constructor(props: ISettingsItemProps) {
    super(props);
  }

  private _onPressButton = () => {
    this.props.navigation.navigate(this.props.page);
  };

  public render(): React.ReactNode  {
    return (
      <TouchableHighlight
        activeOpacity={0.3}
        underlayColor={def.theme2}
        onPress={this._onPressButton}>
        <View style={styles.item}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={std.text}> {this.props.text} </Text>
          </View>
          <Icon
            color={def.grey1}
            name="chevron-right"
            size={30}
          />
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  item:{
    backgroundColor: def.white,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 0.3,
    borderColor: def.grey1,
    padding: 6,
  },
});
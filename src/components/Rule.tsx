import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {def, std} from "../style";
import {Icon} from "react-native-elements";

interface RuleProps {
  title: string;
  text: string;
  id: number;
  time: number;
}

export class Rule extends Component<RuleProps> {

  public render() {
    let phase = 0;
    if(this.props.time > this.props.id) {
      phase = 2;
    } else {
      if(this.props.time === this.props.id) {
       phase = 1;
      }
    }

    return (
      <View style={[styles.rule, phase === 1 && styles.now, phase === 2 && styles.already]}>
        <View style={{flexDirection: "row"}}>
          {phase === 2 &&
            <Icon
              name={"check"}
              color={def.green}
            />
          }
          <Text style={[std.text, styles.rulesText]}>Fase {this.props.id}: </Text>
          <Text style={[std.text, styles.rulesText, phase === 1 && styles.nowText]}>
            {this.props.title}
          </Text>
        </View>
        {phase === 1 &&
          <Text style={[std.text, styles.nowText]}>
            {this.props.text}
          </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rule: {
    margin: 5,
    borderWidth: 1,
    borderColor: def.grey2,
    padding: 10,
  },
  rulesText:{
    color: def.grey1
  },
  now: {
    borderWidth: 2,
    borderColor: def.theme1,
  },
  nowText: {
    fontSize: 20,
    color: def.black,
  },
  already: {
    borderColor: def.green,
  },
});
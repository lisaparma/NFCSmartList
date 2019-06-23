import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Icon} from "react-native-elements";


import { def} from "../style"

interface NullComponentProps {
  type: string
}

export default class NullComponent extends Component<NullComponentProps> {

  public render() {
    return (
      <View style={{flex: 1}}>
        {this.props.type === "likes" &&
          <View style={styles.card}>
            <Text style={styles.title}>Non hai ancora dei cataloghi condivisi contrassegnati come preferiti!</Text>
            <Text style={styles.text}>Visita la pagina delle liste dei tuoi contatti e salvali premendo il pulsante a stella.</Text>
            <View style={styles.icons}>
              <Icon
                color={def.grey0}
                name={"star-border"}
                size={50}
              />
              <Icon
                color={def.black}
                name={"arrow-forward"}
                size={50}
              />
              <Icon
                color={def.yellow}
                name={"star"}
                size={50}
              />
            </View>
          </View>
        }
        {this.props.type === "friends" &&
        <View style={styles.card}>
            <Text style={styles.title}>Non hai ancora dei contatti!</Text>
            <Text style={styles.text}>Premi il pulsante in basso a destra per procedere con l'aggiunta di un contatto.</Text>
            <Image
              style={styles.image}
              source={require("../../assets/arrow.png")}
            />
          </View>
        }
        {this.props.type === "catalogs" &&
          <View style={styles.card}>
            <Text style={styles.title}>Non hai ancora dei cataloghi!</Text>
            <Text style={styles.text}>Premi il pulsante in basso a destra per procedere con la creazione di un catalogo.</Text>
            <Image
              style={styles.image}
              source={require("../../assets/arrow.png")}
            />
          </View>
        }
        {this.props.type === "fr_catalogs" &&
          <View style={styles.card}>
            <Text style={styles.title}>Purtroppo non ha dei cataloghi pubblici!</Text>
            <Text style={styles.text}>Appena il tuo amico procederà a creare dei cataloghi accessibili al pubblico li potrai visualizzare qui.</Text>
          </View>
        }
        {this.props.type === "items" &&
        <View style={styles.card}>
          <Text style={styles.title}>Non ci sono ancora elementi nel catalogo!</Text>
          <Text style={styles.text}>Inseriscili attraverso il riquadro sottostante specificando un nome e associandoci un tag NFC.</Text>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: "bold",
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 22,
  },
  text: {
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 18,
  },
  icons: {
    flexDirection: "row",
    justifyContent: 'center',
    width: "100%",
    paddingVertical: 10
  },
  imageSad: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    transform: [{ rotate: '-20deg' }],
    padding: 0,
    margin: 0
  },
  image: {
    width: 150,
    resizeMode: "contain",
    transform: [{ rotate: '-20deg' }]
  }
});

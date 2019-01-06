import {StyleSheet} from 'react-native';

export const std = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 25,
    color: "#0b6d99",
    fontFamily: "Yanone Kaffeesatz"
  },
  text:{
    fontSize: 20,
    fontFamily: "Yanone Kaffeesatz",
    color: "#3d3d3d",
  },
  warningText: {
    color:"#e01038"
  },
  scroll:{
    padding: 10
  },

  // ----- PULSANTI -----------------------------
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
  safeBut: {
    backgroundColor: "#e01038"
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFF0",
    fontFamily: "Yanone Kaffeesatz"
  },

  // ----- DROPDOWN MENU -----------------------------
  DDScreen: {
    flex: 1,
    position: "absolute",
    alignContent: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: "100%",
    height: "100%",
    paddingHorizontal: 1,
    elevation: 6
  },
  DDmenu: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    paddingHorizontal: 10
  },
  DDitem:{
    padding: 5,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#0b6d99",
  },

});

// ----- INFORMAZIONI -----------------------------
export const info = StyleSheet.create({
  input: {
    flex: 1,
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
  t1: {
    color: "#a8aaaa"
  },
  t2: {
    paddingLeft: 10,
  },
  switch: {
    paddingLeft: 15
  }
});

// ----- LOG IN / SIGN IN -----------------------------
export const log = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10A0E0',
  },
  image: {
    width: 100,
    height: 100,
    margin: 30
  },
  input: {
    backgroundColor: "#FFFFF0",
    width: "50%",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontSize: 15,
    fontFamily: "Yanone Kaffeesatz"
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: '#0b6d99',
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFF0",
    fontFamily: "Yanone Kaffeesatz"
  },
  link: {
    paddingTop: 10,
    fontSize: 15,
    textDecorationLine: "underline",
  }
});

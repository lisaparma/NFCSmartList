import {Dimensions, StyleSheet} from 'react-native';

export const options = [0, 1, 2, 3, 4];
export const labels = ['General', 'Persone', 'Oggetti', "Lista", "Luoghi", "Animali"];
const colors = [
  "#0057a1",
  "#dd4124",
  "#3d3d3d",
  "#fff600",
  "#4ca752",
  "#8f72ba"
];
const icons = ["assignment","group", "build", "format-list-bulleted", "place", "pets"]

export function getLabel(num: number): string {
  return labels[num];
}

export function getColor(num: number): string {
  return colors[num];
}

export function getIcon(num: number): string {
  return icons[num];
}

export const def = {
  black: "#3d3d3d",
  grey0: "#76797a",
  grey1: "#bbbebe",
  grey2: "#edeeee",
  white: "#FAFAFA",
  theme0: "#006eb3",
  theme1: "#0094d5",
  theme2: "#a8e0f9",
  red: "#dd4124",
  green: "#4ca752"
};

export const std = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: def.white
  },
  title: {
    fontSize: 25,
    color: def.theme0,
    // fontFamily: "Yanone Kaffeesatz"
  },
  text:{
    fontSize: 20,
    // fontFamily: "Yanone Kaffeesatz",
    color: def.black,
  },
  warningText: {
    color: def.red
  },
  scroll: {
    padding: 10
  },
  error: {
    backgroundColor: def.white,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: def.red,
    paddingHorizontal: 5
  },

  // ----- PULSANTI -----------------------------
  button: {
    padding: 5,
    marginHorizontal: "25%",
    marginVertical: 15,
    alignItems: "center",
    backgroundColor: def.theme0,
    width: "50%",
    paddingVertical: 10,
    borderRadius: 3,
  },
  buttonDisabled: {
    backgroundColor: def.grey1,
  },
  safeBut: {
    backgroundColor: def.red
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: def.white,
    // fontFamily: "Yanone Kaffeesatz"
  },
  floatingButton: {
    borderWidth: 1,
    borderColor: def.theme1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: def.theme1,
    borderRadius: 100,
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: def.grey1,
    shadowOpacity: 1.0,
    elevation: 5
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
    backgroundColor: def.white,
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
    borderColor: def.theme1,
  },

  // ---- MODALE
  modal: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0.6)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    borderColor: def.grey1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: "75%",
    backgroundColor: def.white,
    padding: 10,
    paddingVertical: 20,
    opacity: 1,
  },
  boxButton:{
    flexDirection: "row",
    alignContent: "space-between"
  },
  modalButton1: {
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: def.theme2,
    margin: 10
  },
  modalButton2: {
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 20,
    backgroundColor: def.grey2,
    margin: 10
  }

});

// ----- INFORMAZIONI -----------------------------
export const info = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 20,
    // fontFamily: "Yanone Kaffeesatz",
    borderRadius: 5,
    borderColor: def.grey1,
    borderWidth: 0.5,
    marginHorizontal: 5
  },
  textBox: {
    flexDirection: "column",
    borderBottomWidth: 0.5,
    borderBottomColor: def.grey1,
    paddingVertical: 10,
    paddingTop: 20
  },
  t1: {
    color: def.grey1
  },
  t2: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 0
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
  },
  switch: {
    flexDirection: "row",
    padding: 5,
    paddingLeft: 15
  }
});

// ----- LOG IN / SIGN IN -----------------------------
export const log = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screen2: {
    justifyContent: 'center',
    paddingTop: '30%',
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
  },
  input: {
    backgroundColor: def.white,
    width: "50%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: def.theme0,
    padding: 10,
    margin: 5,
    fontSize: 15,
    // fontFamily: "Yanone Kaffeesatz"
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: def.theme0,
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: def.white,
    // fontFamily: "Yanone Kaffeesatz"
  },
  link: {
    paddingTop: 10,
    fontSize: 18,
    color: def.theme1,
    textDecorationLine: "underline",
  }
});

export const card = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    margin: 5
  },
  icon: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  centerBox: {
    flex: 1,
    flexDirection: "column",
  },
  t1:{
    color: def.theme0,
  },
  t2: {
    fontSize: 15,
  },
  textCheck: {
    color: def.grey1,
    textDecorationLine: 'line-through',
    textDecorationColor: def.theme0,
  },
  // -- Cataloghi ------
  contCatal: {
    margin: 10,
    paddingVertical: 10,
    backgroundColor: def.white,
    borderWidth: 0.5,
    borderColor: def.grey1,
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: def.grey1,
    shadowOpacity: 1.0,
    elevation: 5

  },

  // -- Item ----------
  contItem: {
    padding: 10,
    borderColor: def.grey1,
    borderBottomWidth: 0.5,
    backgroundColor: def.white,
  },
  // -- Friends ------
  contFriend: {
    height: 80,
    borderColor: def.grey1,
    borderWidth: 0.5,
  },
});
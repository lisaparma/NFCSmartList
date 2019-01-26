import {Dimensions, StyleSheet} from 'react-native';

export const options = [0, 1, 2, 3, 4];
export const labels = ['Blu', 'Rosso', 'Giallo', "Verde", "Viola", "Nero"];
const colors = ["#004fd3", "#d3001a", "#fff600", "#01c00d", "#7401c0", "0e0e0e"];

export function getLabel(num: number): string {
  return labels[num];
}

export function getColor(num: number): string {
  return colors[num];
}

export const def = {
  black: "#3d3d3d",
  grey0: "#76797a",
  grey1: "#bbbebe",
  grey2: "#edeeee",
  white: "#FAFAFA",
  theme0: "#0b6d99",
  theme1: "#10A0E0",
  theme2: "#a8e0f9",
  red: "#e01038",
}

export const std = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 25,
    color: def.theme0,
    fontFamily: "Yanone Kaffeesatz"
  },
  text:{
    fontSize: 20,
    fontFamily: "Yanone Kaffeesatz",
    color: def.black,
  },
  warningText: {
    color: def.red
  },
  scroll: {
    padding: 10
  },

  // ----- PULSANTI -----------------------------
  button: {
    padding: 5,
    marginHorizontal: "25%",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: def.theme0,
    width: "50%",
    paddingVertical: 10,
    borderRadius: 3,
  },
  safeBut: {
    backgroundColor: def.red
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: def.white,
    fontFamily: "Yanone Kaffeesatz"
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
    backgroundColor: def.white,
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
    width: "80%",
    backgroundColor: def.white,
    padding: 10,
    opacity: 1,
  },

  modalButton: {
  }

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
    borderBottomColor: def.grey1,
    paddingVertical: 10,
    paddingTop: 20
  },
  t1: {
    color: def.grey1
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
    backgroundColor: def.theme1,
  },
  image: {
    width: 100,
    height: 100,
    margin: 30
  },
  input: {
    backgroundColor: def.white,
    width: "50%",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontSize: 15,
    fontFamily: "Yanone Kaffeesatz"
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: def.theme0,
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: def.white,
    fontFamily: "Yanone Kaffeesatz"
  },
  link: {
    paddingTop: 10,
    fontSize: 15,
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
    paddingHorizontal: 10
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
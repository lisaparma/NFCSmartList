import {StyleSheet} from 'react-native';

export const info = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 25,
    color: "#0b6d99",
    fontFamily: "Yanone Kaffeesatz"
  },
  input: {
    flex: 1,
    paddingLeft: 10,
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
  text1: {
    fontSize: 20,
    fontFamily: "Yanone Kaffeesatz",
    color: "#a8aaaa"
  },
  text2: {
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: "Yanone Kaffeesatz",
  },
  switch: {
    paddingLeft: 15
  },
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
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFF0",
    fontFamily: "Yanone Kaffeesatz"
  },
});


import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
    backgroundColor: "orange",
    height: Dimensions.get("screen").height,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default styles;

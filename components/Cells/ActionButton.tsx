import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

export const ActionButton = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.handleClick()}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const HeaderAction = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.handleClick()}>
      <View style={styles.headerBtn}>
        <Text style={styles.headerText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 70,
    height: 20,
    backgroundColor: "rgb(6, 68, 32)",
    borderRadius: 2,
    alignSelf: "center",
    margin: 5,
  },
  headerBtn: {
    margin: 25,
    paddingTop: 3,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: "rgb(6, 68, 32)",
    borderRadius: 2,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 15,
    textAlign: "center",
    color: "#fff"
  },
  btnText: { textAlign: "center", color: "#fff" },
});

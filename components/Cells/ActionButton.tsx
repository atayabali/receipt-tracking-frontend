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

const styles = StyleSheet.create({
  btn: {
    width: 70,
    height: 20,
    backgroundColor: "rgb(6, 68, 32)",
    borderRadius: 2,
    alignSelf: "center",
    margin: 5,
  },
  btnText: { textAlign: "center", color: "#fff" },
});

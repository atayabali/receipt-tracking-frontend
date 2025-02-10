import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";

export default function Title(props: any) {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>{props.title}</Text>
      <View
        style={styles.separator}
        lightColor="rgb(0, 62, 41)"
        darkColor="rgb(0, 62, 41)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(188, 189, 203)",
  },
  title: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(6, 68, 32)",
  },
  separator: {
    textAlign: "center",
    marginVertical: 30,
    height: 1.5,
  }
});

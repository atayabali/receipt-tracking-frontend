import React from "react";
import { StyleSheet } from "react-native";
import { Row } from "react-native-table-component";
export const TableHeader = (props: any) => {
  return (
    <Row
      data={props.columnNames}
      style={styles.head}
      textStyle={styles.headText}
    />
  );
};

const styles = StyleSheet.create({
  head: { height: 50, backgroundColor: "rgb(188, 189, 203)" },
  headText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgb(6, 68, 32)",
  },
});

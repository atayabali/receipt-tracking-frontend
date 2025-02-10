import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import React from "react";

export default function ExpenseHeaders(props: any) {
  return (
    <View style={styles.header}>
      <Text style={styles.columnName} onPress={props.handleClick}>
        {props.sortOrder === "desc" ? "Date:desc " : "Date:asc"}
      </Text>
      <Text style={styles.columnName}>Store</Text>
      <Text style={styles.columnName}>Total Price</Text>
    </View>
  );
}

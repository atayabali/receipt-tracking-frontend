import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import React from "react";

export default function SubItemHeaders(props: any) {
  return (
    <View style={styles.header}>
      <Text style={styles.columnName}>Name</Text>
      <Text style={styles.columnName}>Cost</Text>
      <Text style={styles.columnName}>Quantity</Text>
    </View>
  );
}

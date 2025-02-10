import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import React from "react";
import { FlatList } from "react-native";

export default function ExpenseTable(props: any) {
  return (
    <FlatList
      data={props.expenses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.cell}>{item.date}</Text>
          <Text
            style={item.hasSubItems ? styles.clickableCell : styles.cell}
            onPress={() => props.handleClick(item)}
          >
            {item.merchant}
          </Text>

          <Text style={styles.cell}>{item.totalCost.toString()}</Text>
        </View>
      )}
    />
  );
}


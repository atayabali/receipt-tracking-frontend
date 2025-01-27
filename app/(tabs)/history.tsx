import { FlatList, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";
var urlPrefix = `http://${localhost}:5000`;

const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get<Expense[]>(
    `${urlPrefix}/api/v1/expenses/all`
  );
  console.log(response);
  return response.data;
};
export default function History() {
  const router = useRouter();
  //api request works but don't want to call server every time right now so hardcoded
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    //Will need to do conversions for Date and Boolean subItes
    fetchExpenses().then(setExpenses).catch(console.error);
  }, []);
  const viewOverview = (item: Expense) => {
    console.log(item);
    if (item.hasSubItems) {
      router.push({
        pathname: "/overview/expenseOverview",
        params: {
          expenseId: item.id,
          expenseDate: item.date,
          merchant: item.merchant,
          totalCost: item.totalCost,
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* Headers Top Row */}
      <View style={styles.header}>
        <Text style={styles.columnName}>Date</Text>
        <Text style={styles.columnName}>Store</Text>
        <Text style={styles.columnName}>Total Price</Text>
      </View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={item.hasSubItems ? styles.clickableCell : styles.cell} onPress={() => viewOverview(item)}>
              {item.merchant}
            </Text>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.totalCost.toString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
//Make global styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: "rgb(188, 189, 203)",
  },
  header: {
    backgroundColor: "rgb(188, 189, 203)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 15,
  },
  columnName: {
    flex: 1,
    fontSize: 16,
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
    height: 1,
  },
  row: {
    backgroundColor: "rgb(188, 189, 203)",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderRadius: 5,
    borderColor: "#fff",
  },
  cell: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
  },
  clickableCell: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    textDecorationLine: "underline",
  }
});

import { FlatList, ListRenderItem, Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  //api request works but don't want to call server every time right now so hardcoded
  const [expenses, setExpenses] = useState<Expense[]>([
    {
        "id": 1,
        "location": "ALDI",
        "totalCost": "96.88",
        "date": new Date("2025-01-20T06:00:00.000Z")
    },
    {
        "id": 2,
        "location": "Trader Joe's",
        "totalCost": "54.23",
        "date": new Date("2025-01-10T06:00:00.000Z")
    },
    {
        "id": 3,
        "location": "Targeeeeeeeeeeeeeeeeet",
        "totalCost": "24.00",
        "date": new Date("2025-01-03T06:00:00.000Z")
    },
    {
        "id": 4,
        "location": "WalMart",
        "totalCost": "10.00",
        "date": new Date("2025-01-11T06:00:00.000Z")
    }
]);

  useEffect(() => {
    // fetchExpenses().then(setExpenses).catch(console.error);
  }, []);

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
        <Text style={styles.columnName}>Location</Text>
        <Text style={styles.columnName}>Total Price</Text>
        
      </View>
      <FlatList 
      data={expenses} 
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.row}>
          <Text style={styles.cell}>{item.location}</Text>
          <Text style={styles.cell}>{item.date.toLocaleDateString()}</Text>
          <Text style={styles.cell}>{item.totalCost.toString()}</Text>
        </View>
      )}
      />
    </View>
  );
}

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
    flexDirection: 'row',
    marginBottom: 15
  },
  columnName:{
    flex: 1,
    fontSize: 16,
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(6, 68, 32)",
  },
  separator: {
    textAlign: 'center',
    marginVertical: 30,
    height: 1,
  },
  row: {
    backgroundColor: "rgb(188, 189, 203)",
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderRadius: 5,
    borderColor: '#fff',
  },
  cell: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
  }
});

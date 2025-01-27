import axios from "axios";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, FlatList } from "react-native";

var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";

var urlPrefix = `http://${localhost}:5000`; //I really need to set this globally

const fetchSubItems = async (expenseId: string): Promise<SubItem[]> => {
  const response = await axios.get<SubItem[]>(
    `${urlPrefix}/api/v1/subexpenses/${expenseId}`
  );
  console.log(response);
  return response.data;
};
export default function ExpenseOverview() {
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    var expenseId = searchParams.get("expenseId");
    if (expenseId != null) {
      fetchSubItems(expenseId).then(setSubItems).catch(console.error);
    }
  }, []);
  const merchant = searchParams.get("merchant");
  const expenseDate = searchParams.get("expenseDate");
  const totalCost = searchParams.get("totalCost");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Summary: ${totalCost} at {merchant} on {expenseDate}{" "}
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* Headers Top Row */}
      <View style={styles.header}>
        <Text style={styles.columnName}>Name</Text>
        <Text style={styles.columnName}>Cost</Text>
        <Text style={styles.columnName}>Quantity</Text>
      </View>
      <FlatList
        data={subItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.cost}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
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
  // clickableCell: {
  //   flex: 1,
  //   textAlign: "left",
  //   fontSize: 16,
  //   textDecorationLine: "underline",
  // }
});

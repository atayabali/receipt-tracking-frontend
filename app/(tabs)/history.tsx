import { styles } from "@/assets/globalStyles";
import ExpenseHeaders from "@/components/ExpenseHeaders";
import ExpenseTable from "@/components/ExpenseTable";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";
var urlPrefix = `http://${localhost}:5000`;

const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get<Expense[]>(
    `${urlPrefix}/api/v1/expenses/all`
  );
  return response.data;
};

export default function History() {
  const router = useRouter();
  //api request works but don't want to call server every time right now so hardcoded
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sortBy, setSortBy] = useState("desc");

  const reverseSortExpenses = () => {
    setSortBy(sortBy === "desc" ? "asc" : "desc");
    setExpenses(
      expenses.sort((a, b) => {
        return sortBy === "desc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    );
  };

  useEffect(() => {
    fetchExpenses().then(setExpenses).catch(console.error);
  }, []);

  const viewOverview = (item: Expense) => {
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
    <View style={styles.tableContainer}>
      <Title title="Expense History"></Title>
      <ExpenseHeaders sortOrder={sortBy} handleClick={reverseSortExpenses}/>
      <ExpenseTable expenses={expenses} handleClick={viewOverview}/>
    </View>
  );
}


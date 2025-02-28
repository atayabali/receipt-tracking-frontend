import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import { fetchExpenses } from "@/services/expenseService";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ExpenseTableV2 from "@/components/ExpenseTableV2";
import { Expense } from "@/models/Expense";
import { ScrollView } from "react-native";

export default function History() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dateOrder, setDateOrder] = useState("desc");
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const getExpenses = async () => {
      fetchExpenses().then(setExpenses).catch(console.error);
      setRefresh(false);
    };

    if (refresh) {
      getExpenses();
    }
  }, [refresh]); // The function only runs when property is true

  // https://reactnavigation.org/docs/use-focus-effect/
  //useFocusEffect - to run side-effects when a screen is focused. A side effect may involve things like adding an event listener, fetching data,
  useFocusEffect(
    useCallback(() => {
      fetchExpenses().then(setExpenses).catch(console.error);
    }, [])
  );

  const sortExpenses = () => {
    var isDesc = dateOrder === "desc";
    setDateOrder(isDesc ? "asc" : "desc");
    setExpenses(
      expenses.sort((a, b) => {
        return isDesc
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    );
  };

  const viewBreakdown = (item: Expense) => {
    // console.log(item);
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
      {!refresh && (
        <ExpenseTableV2
          expenses={expenses}
          viewBreakdown={viewBreakdown}
          sortDate={sortExpenses}
          order={dateOrder}
          onDelete={() => setRefresh(true)}
        />
      )}
    </View>
  );
}

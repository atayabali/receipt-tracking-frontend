import { styles } from "@/assets/globalStyles";
import ExpenseHeaders from "@/components/ExpenseHeaders";
import ExpenseTable from "@/components/ExpenseTable";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import { fetchExpenses } from "@/services/expenseService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function History() {
  const router = useRouter();
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
      <ExpenseHeaders sortOrder={sortBy} handleClick={reverseSortExpenses} />
      <ExpenseTable expenses={expenses} handleClick={viewOverview} />
    </View>
  );
}

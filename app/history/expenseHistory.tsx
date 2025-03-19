import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import { deleteExpense, fetchExpenses } from "@/services/expenseService";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ExpenseHistoryTable from "@/components/Tables/ExpenseHistoryTable";
import { Expense } from "@/models/Expense";
import ConfirmCancelAlert from "@/components/Alerts/ConfirmCancelAlert";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";

export default function ExpenseHistory() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dateOrder, setDateOrder] = useState("desc");
  const [refresh, setRefresh] = useState(true);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);

  const updateExpenseToDelete = (newValue: number | null) => {
    setExpenseToDelete(newValue);
  };

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
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchExpenses()
  //       .then(setExpenses)
  //       .catch((e) => console.log(e));
  //   }, [])
  // );

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
    if (item.hasSubItems) {
      router.push({
        pathname: "/history/expenseOverview",
        params: {
          expenseId: item.id,
          expenseDate: item.date,
          merchant: item.merchant,
          totalCost: item.totalCost,
          imageKey: item.imageKey
        },
      });
    }
  };

  return (
    <View style={styles.tableContainer}>
      <GreenOutlineBtn
        buttonText={`Sort: Date (${dateOrder})`}
        handleClick={sortExpenses}
      />
      {!refresh && (
        <ExpenseHistoryTable
          expenses={expenses}
          viewBreakdown={viewBreakdown}
          updateExpenseToDelete={updateExpenseToDelete}
          onDelete={() => setRefresh(true)}
        />
      )}
      {expenseToDelete !== null && (
        <ConfirmCancelAlert
          show={expenseToDelete !== null}
          title="Delete Expense"
          message="Are you sure you want to delete this expense? Existing Sub Items will be deleted with it."
          dismissAlert={() => updateExpenseToDelete(null)}
          confirmPressed={() => {
            if (expenseToDelete !== null) {
              deleteExpense(expenseToDelete.toString()).then((res) => {
                if (res === 200) setRefresh(true);
              });
            }
          }}
        />
      )}
    </View>
  );
}

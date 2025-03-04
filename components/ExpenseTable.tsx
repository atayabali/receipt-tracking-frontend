import { View } from "@/components/Themed";
import { Expense } from "@/models/Expense";
import { deleteExpense } from "@/services/expenseService";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import { ActionButton } from "./Cells/ActionButton";
import ConfirmCancelAlert from "./Alerts/ConfirmCancelAlert";
import { TableHeader } from "./Cells/TableHeader";
// https://www.npmjs.com/package/react-native-table-component
//you can add a button, make it clickable so that's good

//Had to use this git forked version in package.json to fix console error on textStyle prop for Cell: https://github.com/dohooo/react-native-table-component/issues/145
export default function ExpenseTable(props: any) {
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const showAlert = (id: number) => {
    setExpenseToDelete(id);
  };
  const hideAlert = () => {
    setExpenseToDelete(null);
  };

  const data = {
    tableHead: ,
    tableData: props.expenses.map((expense: Expense) => [
      expense.merchant,
      expense.totalCost,
      expense.date,
      expense.id,
    ]),
  };

  const DateHeader = () => {
    var dateText = `Date ${props.order}`;
    return (
      <ActionButton text={dateText} handleClick={() => props.sortDate()} />
    );
  };

  const ActionsCell = (rowData: any) => {
    var expenseId = rowData[3];
    var expense = props.expenses.find((exp: Expense) => exp.id === expenseId);
    return (
      <View style={styles.actions}>
        {expense.hasSubItems ? (
          <ActionButton
            text="View"
            handleClick={() => props.viewBreakdown(expense)}
          />
        ) : null}
        <ActionButton text="Delete" handleClick={() => showAlert(expense.id)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Table borderStyle={styles.tableBorder}>
          <TableHeader columnNames={data.tableHead.map((header, index) =>
              index === 2 ? DateHeader() : header
            )}/>

          {data.tableData.map((rowData: any, index: number) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData: any, cellIndex: number) => (
                <Cell
                  key={cellIndex}
                  data={
                    cellIndex === 3 ? ActionsCell(rowData) : cellData
                  }
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </ScrollView>
      <ConfirmCancelAlert
        show={expenseToDelete !== null}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? Existing Sub Items will be deleted with it."
        dismissAlert={() => hideAlert()}
        confirmPressed={() => {
          if (expenseToDelete !== null) {
            deleteExpense(expenseToDelete.toString()).then((res) => {
              if (res === 200) props.onDelete();
            });
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgb(188, 189, 203)",
  },
  tableBorder: { borderWidth: 4, borderColor: "rgb(6, 68, 32)" },
  text: { margin: 2, fontSize: 14, textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "rgb(188, 189, 203)" },
  actions: { backgroundColor: "rgb(188, 189, 203)" },
});

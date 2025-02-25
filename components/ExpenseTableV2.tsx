import { Text, View } from "@/components/Themed";
import { Expense } from "@/models/Expense";
import { deleteExpense } from "@/services/expenseService";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
// https://www.npmjs.com/package/react-native-table-component
//you can add a button, make it clickable so that's good

//Had to use this git forked version in package.json to fix console error on textStyle prop for Cell: https://github.com/dohooo/react-native-table-component/issues/145
export default function ExpenseTableV2(props: any) {
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const showAlert = (id: number) => {
    setExpenseToDelete(id);
  };

  const hideAlert = () => {
    setExpenseToDelete(null);
  };
  const data = {
    tableHead: ["Store", "Total Price", "Date (desc)", "Actions"],
    tableData: props.expenses.map((expense: Expense) => [
      expense.merchant,
      expense.totalCost,
      expense.date,
      expense.id,
    ]),
  };

  const DateCell = (index: number) => {
    var order = props.order === "desc" ? "Descending" : "Ascending"; //Might make this an icon later
    return (
      <TouchableOpacity key={index} onPress={() => props.sortDate()}>
        <Text style={styles.headText}>Date ({props.order}) </Text>
      </TouchableOpacity>
    );
  };

  const ActionBtn = (btnText: string, handleClick: any) => {
    return (
      <TouchableOpacity onPress={handleClick}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{btnText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const actionsCell = (rowData: any, index: number) => {
    var expense = props.expenses.find((exp: Expense) => exp.id === rowData[3]);
    return (
      <View style={styles.actions}>
        {expense.hasSubItems
          ? ActionBtn("View", () => props.viewBreakdown(expense))
          : null}
        {ActionBtn("Delete", () => showAlert(expense.id))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 4, borderColor: "rgb(6, 68, 32)" }}>
        <Row
          data={data.tableHead.map((header, index) =>
            index === 2 ? DateCell(index) : header
          )}
          style={styles.head}
          textStyle={styles.headText}
        />

        {data.tableData.map((rowData: any, index: number) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData: any, cellIndex: number) => (
              <Cell
                key={cellIndex}
                data={cellIndex === 3 ? actionsCell(rowData, index) : cellData}
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
      {/* https://www.npmjs.com/package/react-native-awesome-alerts */}
      <AwesomeAlert
        show={expenseToDelete !== null}
        showProgress={false}
        title="Delete Expense?"
        message="Are you sure you want to delete this expense? Existing Sub Items will be deleted with it."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onDismiss={() => hideAlert()}
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          hideAlert();
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
  head: { height: 50, backgroundColor: "rgb(188, 189, 203)" },
  headText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgb(6, 68, 32)",
  },
  text: { margin: 2, fontSize: 14, textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "rgb(188, 189, 203)" },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "rgb(6, 68, 32)",
    borderRadius: 2,
    alignSelf: "center",
    margin: 5,
  },
  btnText: { textAlign: "center", color: "#fff" },
  actions: { backgroundColor: "rgb(188, 189, 203)" },
});

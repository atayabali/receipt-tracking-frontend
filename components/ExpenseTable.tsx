import { View } from "@/components/Themed";
import { Expense } from "@/models/Expense";
import React from "react";
import { ScrollView } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { ActionButton } from "./Cells/ActionButton";
import { styles } from "@/assets/globalStyles";
import { TableHeader } from "./Cells/TableHeader";
// https://www.npmjs.com/package/react-native-table-component
//you can add a button, make it clickable so that's good

//Had to use this git forked version in package.json to fix console error on textStyle prop for Cell: https://github.com/dohooo/react-native-table-component/issues/145
export default function ExpenseTable(props: any) {
  const showAlert = (id: number) => {
    props.updateExpenseToDelete(id);
  };

  const data = {
    tableHead: ["Store", "Total Price", `Date`, "Actions"],
    tableData: props.expenses.map((expense: Expense) => [
      expense.merchant,
      expense.totalCost,
      expense.date,
      expense.id,
    ]),
  };

  const ActionsCell = (rowData: any) => {
    var expenseId = rowData[3];
    var expense = props.expenses.find((exp: Expense) => exp.id === expenseId);
    return (
      <View style={styles.actionsColumn}>
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
    <ScrollView>
      <Table borderStyle={styles.tableBorder}>
        <TableHeader
          columnNames={data.tableHead.map((header) => header)}
        />

        {data.tableData.map((rowData: any, index: number) => (
          <TableWrapper key={index} style={styles.tableRow}>
            {rowData.map((cellData: any, cellIndex: number) => (
              <Cell
                key={cellIndex}
                data={cellIndex === 3 ? ActionsCell(rowData) : cellData}
                textStyle={styles.cellText}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
    </ScrollView>
  );
}

import { View } from "@/components/Themed";
import { Expense } from "@/models/Expense";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { ActionButton, HeaderAction } from "../Cells/ActionButton";
import { styles } from "@/assets/globalStyles";
import { TableHeader } from "../Cells/TableHeader";
// https://www.npmjs.com/package/react-native-table-component
//you can add a button, make it clickable so that's good

//Had to use this git forked version in package.json to fix console error on textStyle prop for Cell: https://github.com/dohooo/react-native-table-component/issues/145
export default function ExpenseHistoryTable(props: any) {
  const [sortDesc, setSortOrder] = useState(true);
  const [sortType, setSortType] = useState("Date");
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
            text="View/Edit"
            handleClick={() => props.viewBreakdown(expense)}
          />
        ) : null}
        <ActionButton text="Delete" handleClick={() => showAlert(expense.id)} />
      </View>
    );
  };
  const sortDate = () => {
    return props.expenses.sort((a: Expense, b: Expense) => {
      return sortDesc
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  };

  const sortPrice = () => {
    return props.expenses.sort((a: Expense, b: Expense) => {
      return sortDesc
        ? Number(a.totalCost) - Number(b.totalCost)
        : Number(b.totalCost) - Number(a.totalCost);
    });
  };

  const sortName = () => {
    return props.expenses.sort((a: Expense, b: Expense) => {
      const nameA = a.merchant.toUpperCase();  
      const nameB = b.merchant.toUpperCase();
      return sortDesc ? (nameA < nameB ? -1 : 1) : (nameA > nameB ? -1 : 1);
    })
  };

  const sortByHeader = (header: string) => {
    var prevType = sortType;
    setSortType(header);

    if (sortType === prevType) {
      setSortOrder(!sortDesc);
    } else {
      setSortType(header);
      setSortOrder(true);
    }

    if (sortType === "Store") {
      props.setExpenses(sortName());
    } else if(sortType === "Total Price"){
      props.setExpenses(sortPrice());
    } else {
      props.setExpenses(sortDate());
    }
}
  const Header = (header: string) => {
    return header === "Actions" ? (
      header
    ) : (
      <HeaderAction text={header} handleClick={() => sortByHeader(header)} />
    );
  };

  return (
    <ScrollView>
      <Table borderStyle={styles.tableBorder}>
        <TableHeader
          columnNames={data.tableHead.map((header) => Header(header))}
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

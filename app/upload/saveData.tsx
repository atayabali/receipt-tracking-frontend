import { styles } from "@/assets/globalStyles";
import { TableHeader } from "@/components/Cells/TableHeader";
import { MyFormValues } from "@/components/Forms/FormikContainer";
import TextError from "@/components/Forms/TextError";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { Text } from "@/components/Themed";
import { SubExpense } from "@/models/SubItem";
import { postExpense } from "@/services/expenseService";
import { calculateSubTotal, checkSubItems } from "@/services/subItemValidator";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { ScrollView, TextInput } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";

export default function SaveExpenseData() {
  const params = useSearchParams();
  const router = useRouter();
  const expenseData = JSON.parse(params.get("expenseData") ?? "{}");
  const [subItems, setSubItems] = useState(expenseData.subItems);
  //"incomplete", "unequal", or "complete"
  const [subItemsTotal, setSubTotal] = useState(0);
  const [breakdownStatus, setBreakdownStatus] = useState("complete");

  const saveExpenseData = async () => {
    const expenseBody: MyFormValues = {
      expenseName: expenseData.merchant,
      totalCost: expenseData.totalCost,
      expenseDate: new Date(expenseData.expenseDate),
      costBreakdown: expenseData.hasSubItems,
      subExpenses: subItems,
    };
    var status = checkSubItems(subItems, expenseData.totalCost);
    setBreakdownStatus(status);
    if (expenseData.hasSubItems && status !== "complete") {
      setSubTotal(calculateSubTotal(subItems));
      return;
    }

    await postExpense(expenseBody)
      .then((res) => {
        router.back();
        router.back();
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const textCell = (itemIndex: number, property: string, value: any) => {
    return (
      <TextInput
        value={value.toString()}
        onChangeText={(val: any) => {
          setSubItems((prevItems: SubExpense[]) => {
            return prevItems.map((item, i) =>
              i === itemIndex ? { ...item, [property]: val } : item
            );
          });
        }}
        style={styles.cellText}
      />
    );
  };

  return (
    <ScrollView>
      <Text>Expense/Store: {expenseData.merchant}</Text>
      <Text>Expense Date: {expenseData.expenseDate}</Text>
      <Text>Total Price: {expenseData.totalCost}</Text>
      {breakdownStatus === "unequal" && (
        <TextError children="The Total Expense Price and Sum of Sub Items is not equal. Adjust costs, quantities or add sub expenses to fix this discrepency." />
      )}

      {breakdownStatus === "incomplete" && (
        <TextError children="Sub Items table is incomplete. Please fill out before saving." />
      )}
      {breakdownStatus !== "complete" && (
        <Text>Sub Items Total: {subItemsTotal}</Text>
      )}
      <Table borderStyle={{ borderWidth: 4, borderColor: "rgb(6, 68, 32)" }}>
        <TableHeader columnNames={["Item Name", "Price", "Quantity"]} />

        {subItems?.map((subItem: any, index: number) => (
          <TableWrapper key={index} style={styles.tableRow}>
            {Object.entries(subItem).map(([key, value]) => {
              return (
                <Cell
                  key={`${index}.${key}`}
                  data={textCell(index, key, value)}
                  textStyle={styles.cellText}
                />
              );
            })}
          </TableWrapper>
        ))}
      </Table>
      <Text> Edit any incorrect information and click Save when finished</Text>
      <GreenOutlineBtn
        handleClick={async () => await saveExpenseData()}
        buttonText="Save Expense"
      />
    </ScrollView>
  );
}

// const styles = StyleSheet.create({

//   cellText: { margin: 2, fontSize: 14, textAlign: "center" },
//   tableRow: { flexDirection: "row", backgroundColor: "rgb(188, 189, 203)" },
//   btn: {
//     width: 58,
//     height: 18,
//     backgroundColor: "rgb(6, 68, 32)",
//     borderRadius: 2,
//     alignSelf: "center",
//     margin: 5,
//   },
//   btnText: { textAlign: "center", color: "#fff" },
//   actions: { backgroundColor: "rgb(188, 189, 203)" },
// });

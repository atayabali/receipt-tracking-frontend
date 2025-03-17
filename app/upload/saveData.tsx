import { styles } from "@/assets/globalStyles";
import { TableHeader } from "@/components/Cells/TableHeader";
import TextError from "@/components/Forms/TextError";
import TotalsDisplay from "@/components/Forms/TotalsDisplay";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { Text } from "@/components/Themed";
import { ExpenseFormValues } from "@/models/Expense";
import { SubExpense } from "@/models/SubItem";
import { postExpense } from "@/services/expenseService";
import { checkSubItems } from "@/services/subItemValidator";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import moment from "moment";
import React, { useState } from "react";
import { ScrollView, TextInput } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";

export default function SaveExpenseData() {
  const params = useSearchParams();
  const router = useRouter();
  const expenseData = JSON.parse(params.get("expenseData") ?? "{}");
  const [subItems, setSubItems] = useState(expenseData.subItems);
  const [merchant, setMerchant] = useState(expenseData.merchant);
  const [expenseDate, setDate] = useState(expenseData.expenseDate);
  const [totalCost, setTotal] = useState(expenseData.totalCost.toString());
  //"incomplete", "unequal", or "complete"
  const [breakdownStatus, setBreakdownStatus] = useState("complete");

  const saveExpenseData = async () => {
    const expenseBody: ExpenseFormValues = {
      expenseName: merchant,
      totalCost: totalCost,
      expenseDate: moment(expenseDate, "MM/DD/YYYY").toDate(),
      costBreakdown: expenseData.hasSubItems,
      subExpenses: subItems,
      imageKey: params.get("imageKey")
    };
    var status = checkSubItems(subItems, expenseData.totalCost);
    setBreakdownStatus(status);
    if (status !== "complete") return;
    
    await postExpense(expenseBody)
      .then((res) => {
        router.back();
        router.back();
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const addTax = (difference: number) => {
    setSubItems([...subItems, {name: "TAX", cost: difference, quantity: 1}])
  }
  
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
    // <View >
    <ScrollView style={{backgroundColor: "rgb(188, 189, 203)", padding: 10}}>
            <Text>Expense/Store:</Text>
            <TextInput
              value={merchant}
              onChangeText={(val) => setMerchant(val)}
              style={styles.input}
            />
            <Text>Expense Date:</Text>
            <TextInput
              value={expenseDate}
              onChangeText={(val) => setDate(val)}
              style={styles.input}
            />
            <Text>Total Price:</Text>
            <TextInput
              value={totalCost.toString()}
              onChangeText={(val) => setTotal(val)}
              style={styles.input}
            />

      <TotalsDisplay totalCost={totalCost} subItems={subItems} canAddTax={true} addTax={addTax}/> 
      
      {breakdownStatus === "incomplete" && (
        <TextError children="Sub Items table is incomplete. Please fill out before saving." />
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
        handleClick={async () => setSubItems([...subItems, {name: "", cost: 0.00, quantity: 1}])      }
        buttonText="Add SubItem"
      />

      <GreenOutlineBtn
        handleClick={async () => await saveExpenseData()}
        buttonText="Save Expense"
      />
    </ScrollView>
    // </View>
  );
}

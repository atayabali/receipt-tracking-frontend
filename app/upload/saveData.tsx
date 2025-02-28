import { MyFormValues } from "@/components/Forms/FormikContainer";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { Text, View } from "@/components/Themed";
import { SubExpense, SubItem } from "@/models/SubItem";
import { postExpense } from "@/services/expenseService";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";


export default function SaveExpenseData() {
  const params = useSearchParams();
  const router = useRouter();
  const expenseData = JSON.parse(params.get("expenseData") ?? "{}");
  // var expenseDate: Date = expenseData.expenseDate;
  // console.log(typeof(expenseDate));
  const [subItems, setSubItems] = useState(expenseData.subItems);

  const saveExpenseData = async () => {
        console.log("save data");
        const expenseBody: MyFormValues = {
          expenseName: expenseData.merchant,
          totalCost: expenseData.totalCost,
          expenseDate: new Date(expenseData.expenseDate),
          costBreakdown: expenseData.hasSubItems,
          subExpenses: subItems
        }
        // var invalidSubItemsExist = values.subExpenses.some(sub => sub.name.length === 0 || sub.cost <= 0);
        // setSubExpenseErrors(invalidSubItemsExist);
        // if(invalidSubItemsExist) return;
    
        await postExpense(expenseBody)
          .then((res) => {
            console.log(res);
            router.back();
            router.back();
          })
          .catch((ex) => {
            console.log(ex);
          });
  }

  const textCell = (itemIndex: number, property: string, value: any) => {
    return (
      <TextInput
        value={value}
        onChangeText={(val: any) => {
          setSubItems((prevItems: SubExpense[]) => {
            return prevItems.map((item, i) => i === itemIndex ? {...item, [property]: val} : item)
          });
        }}
        style={styles.text}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>Expense/Store: {expenseData.merchant}</Text>
      <Text>Expense Date: {expenseData.expenseDate}</Text>
      <Text>Total Price: {expenseData.totalCost}</Text>
      <Table borderStyle={{ borderWidth: 4, borderColor: "rgb(6, 68, 32)" }}>
        <Row
          data={["Item Name", "Price", "Quantity"]}
          style={styles.head}
          textStyle={styles.headText}
        />

        {subItems?.map((subItem: any, index: number) => (
          <TableWrapper key={index} style={styles.row}>
            {Object.entries(subItem).map(([key, value]) => (
              <Cell
                key={`${index}.${key}`}
                data={textCell(index, key, value)}
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
      <Text> Edit any incorrect information and click Save when finished</Text>
      <GreenOutlineBtn 
            handleClick={async () => await saveExpenseData()}
            buttonText="Save Expense"
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

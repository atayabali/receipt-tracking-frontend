import { Text, View } from "@/components/Themed";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import { SubItem } from "@/models/SubItem";
import { FieldArray } from "formik";
import GreenOutlineBtn from "../GreenOutlineBtn";

function FieldListV2(props: any) {
  const { label, name, onChange } = props;

  const convertIndexToProperty = (cellIndex: number) => {
    switch (cellIndex) {
      case 0:
        return "name";
      case 1:
        return "cost";
      case 2:
        return "quantity";
      default:
        return "id";
    }
  };
  const textCell = (rowIndex: number, cellIndex: number, cellData: string) => {
    var propertyName = convertIndexToProperty(cellIndex);
    return (
      <TextInput
        value={cellData}
        onChangeText={(val: any) => {
          onChange(`subExpenses[${rowIndex}][${propertyName}]`, val);
        }}
        style={styles.text}
      />
    );
  };

  const removeBtn = (removeRow: any) => {
    return (
      <View style={styles.actions}>
        <TouchableOpacity onPress={removeRow}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Remove</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "rgb(188, 189, 203)" }}>
      <Text>{label}</Text>
      <FieldArray name={name}>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const { subExpenses } = values;
          var tableData = subExpenses.map((subItem: SubItem) => [
            subItem.name,
            subItem.cost,
            subItem.quantity,
            subItem.id,
          ]);
          return (
            <View style={styles.container}>
              <Table
                borderStyle={{ borderWidth: 4, borderColor: "rgb(6, 68, 32)" }}
              >
                <Row
                  data={["Item Name", "Price", "Quantity", "Actions"]}
                  style={styles.head}
                  textStyle={styles.headText}
                />

                {tableData.map((rowData: any, index: number) => (
                  <TableWrapper key={index} style={styles.row}>
                    {rowData.map((cellData: any, cellIndex: number) => (
                      <Cell
                        key={cellIndex}
                        data={
                          index > 0 && cellIndex === 3
                            ? removeBtn(() => remove(index))
                            : textCell(index, cellIndex, cellData)
                        }
                        textStyle={styles.text}
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
              <GreenOutlineBtn
                handleClick={() => push({ name: "", cost: 0, quantity: 1 })}
                buttonText="Add Sub Expense"
              />
            </View>
          );
        }}
      </FieldArray>
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
  text: { margin: 2, fontSize: 14, textAlign: "center", height: 40 },
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
  input: {
    borderWidth: 1,
    width: 300,
    maxWidth: "100%",
    borderColor: "#ddd",
    padding: 5,
    fontSize: 12,
    borderRadius: 6,
  },
});

export default FieldListV2;

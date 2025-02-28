import { Text, View } from "@/components/Themed";
import { SubItem } from "@/models/SubItem";
import { deleteSubItemById } from "@/services/subexpenseService";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
// https://www.npmjs.com/package/react-native-table-component
//you can add a button, make it clickable so that's good

//Had to use this git forked version in package.json to fix console error on textStyle prop for Cell: https://github.com/dohooo/react-native-table-component/issues/145
export default function SubItemTableV2(props: any) {
  const data = {
    tableHead: ["Item Name", "Price", "Quantity", "Actions"],
    tableData: props.subItems.map((subItem: SubItem) => [
      subItem.name,
      subItem.cost,
      subItem.quantity,
      subItem.id,
    ]),
  };

  const ActionBtn = (btnText: string, handleClick: any) => (
    <TouchableOpacity onPress={handleClick}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{btnText}</Text>
      </View>
    </TouchableOpacity>
  );

  const deleteBtn = (rowData: any, index: number) => {
    return (
      <View style={styles.actions}>
        {ActionBtn("Delete", () => deleteSubItemById(rowData[3]).then((res) => {
          if(res === 200){
            console.log("Succesful Delete")
            props.onDelete();
          } else if(res === 404){
            console.log("Sub Item was not found or already deleted")
          } else {
            console.log("Delete attempt failed");
          }
        }))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 4, borderColor: "rgb(6, 68, 32)" }}>
        <Row
          data={data.tableHead}
          style={styles.head}
          textStyle={styles.headText}
        />

        {data.tableData.map((rowData: any, index: number) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData: any, cellIndex: number) => (
              <Cell
                key={cellIndex}
                data={cellIndex === 3 ? deleteBtn(rowData, index) : cellData}
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
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

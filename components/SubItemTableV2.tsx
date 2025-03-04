import { SubItem, SubItemRequestBody } from "@/models/SubItem";
import { deleteSubItemById, postSubItem } from "@/services/subexpenseService";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import DismissableAlert from "./Alerts/DismissableAlert";
import { ActionButton } from "./Cells/ActionButton";
import { TableHeader } from "./Cells/TableHeader";
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
  const [isCreated, setIsCreated] = useState<boolean | null>(null);
  const [isDeleted, setIsDeleted] = useState<boolean | null>(null);
  const [invalidBody, setInvalidBody] = useState(false);

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

  const TextCell = (rowIndex: number, cellIndex: number, cellData: string) => {
    var propertyName = convertIndexToProperty(cellIndex);
    return (
      <TextInput
        value={cellData}
        onChangeText={(val: any) => {
          props.updateItem(rowIndex, propertyName, val);
        }}
        style={styles.text}
      />
    );
  };

  const deleteSubItem = (subExpenseId: string) => {
    deleteSubItemById(subExpenseId).then((res) => {
      if (res === 200) {
        setIsDeleted(true);
        props.onDelete();
      } else {
        setIsDeleted(false);
      }
    })
  }

  const DeleteButton = (subItemId: any) => {
    return <ActionButton text="Delete" handleClick={() => deleteSubItem(subItemId)} />
  };

  const createSubItem = (body: SubItemRequestBody ) => {
    postSubItem(body).then((res) => {
      if (res === 200) {
        setIsCreated(true);
        props.onAdd();
      } else {
        setIsCreated(false);
      }
    });
  }

  const AddButton = (rowData: any, expenseId: number) => {
    return <ActionButton text="Add" handleClick={() => () => {
          var body: SubItemRequestBody = {
            expenseId: expenseId,
            name: rowData[0],
            cost: parseFloat(rowData[1]),
            quantity: parseFloat(rowData[2]),
          };

          if (body.name.length === 0 || body.cost < 0 || body.quantity < 0) {
            setInvalidBody(true);
            return;
          }
          createSubItem(body);
        }
        } />
  };

  const CellContent = (
    cellData: any,
    cellIndex: number,
    rowData: any,
    rowIndex: number
  ) => {
    var subItemId = rowData[3];
    if(subItemId === null) {
      if(cellIndex === 3) return AddButton(rowData, props.expenseId); 
      else return TextCell(rowIndex, cellIndex, cellData);
    } else {
      if(cellIndex === 3) return DeleteButton(subItemId);
      else return cellData;
    }
  };

  return (
    <ScrollView>
      <Table borderStyle={{ borderWidth: 4, borderColor: "rgb(6, 68, 32)" }}>
        <TableHeader columnNames={data.tableHead}/>

        {props.subItems &&
          data.tableData.map((rowData: any, index: number) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData: any, cellIndex: number) => (
                <Cell
                  key={cellIndex}
                  data={CellContent(cellData, cellIndex, rowData, index)}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
      </Table>

      <DismissableAlert
        showAlert={isCreated !== null}
        title={isCreated ? "SubItem was added" : "Failed to create subitem" }
        onDismiss={() => setIsCreated(null)}
      />
      <DismissableAlert
        showAlert={isDeleted !== null}
        title={isDeleted ? "SubItem was deleted" : "Failed to delete subitem" }
        onDismiss={() => setIsDeleted(null)}
      />
      <DismissableAlert
        showAlert={invalidBody}
        title="SubItem is incomplete"
        onDismiss={() => setInvalidBody(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgb(188, 189, 203)",
  },
  text: { margin: 2, fontSize: 14, textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "rgb(188, 189, 203)" },
});

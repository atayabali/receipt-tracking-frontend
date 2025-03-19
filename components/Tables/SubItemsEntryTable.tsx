import React from "react";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { TableHeader } from "../Cells/TableHeader";
import { styles } from "@/assets/globalStyles";
import { TextInput, View } from "react-native";
import { ActionButton } from "../Cells/ActionButton";
import { SubItem } from "@/models/SubItem";
import GreenOutlineBtn from "../GreenOutlineBtn";

export default function SubItemsEntryTable(props: any) {
  const { subItems, setSubItems } = props;
  var tableData = subItems.map((subItem: SubItem) => ({
    ...subItem,
    action: 1,
  }));

  const removeItem = (index: number) => {
    setSubItems((prevItems: any) => prevItems.toSpliced(index, 1));
  };

  const updateText = (itemIndex: number, property: any, val: any) => {
    setSubItems((prevItems: any) => {
      return prevItems.map((item: any, i: number) =>
        i === itemIndex ? { ...item, [property]: val } : item
      );
    });
  };

  function TextCell(itemIndex: number, property: string, value: any) {
    return property === "action" ? (
      <ActionButton text="Remove" handleClick={() => removeItem(itemIndex)} />
    ) : (
      <TextInput
        value={value.toString()}
        onChangeText={(val: any) => updateText(itemIndex, property, val)}
        style={styles.cellText}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 4, borderColor: "rgb(6, 68, 32)" }}>
        <TableHeader columnNames={props.columnNames} />

        {tableData?.map((subItem: any, index: number) => (
          <TableWrapper key={index} style={styles.tableRow}>
            {Object.entries(subItem).map(([key, value]) => {
              return (
                <Cell
                  key={`${index}.${key}`}
                  data={TextCell(index, key, value)}
                  textStyle={styles.cellText}
                />
              );
            })}
          </TableWrapper>
        ))}
      </Table>

      <GreenOutlineBtn
        handleClick={() => setSubItems([...subItems, { name: "", cost: 0, quantity: 0 }])}
        buttonText="Add Sub Expense"
      />
    </View>
  );
}

import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import { SubItem } from "@/models/SubItem";
import React from "react";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { ActionButton } from "../Cells/ActionButton";
import GreenOutlineBtn from "../GreenOutlineBtn";
import SubItemTextCell from "../Cells/SubItemTextCell";
import { TableHeader } from "../Cells/TableHeader";

export const FieldListV2 = (props: any) => {
  const { label, name, onChange } = props;
  var tableData = props.subItems.map((subItem: SubItem) => [
    subItem.name,
    subItem.cost,
    subItem.quantity,
    subItem.id,
  ]);
  const CellContent = (cellData: any, cellIndex: number, rowIndex: number) => {
    return rowIndex > 0 && cellIndex === 3 ? (
      <ActionButton
        text="Remove"
        handleClick={() => props.onRemove(rowIndex)}
      />
    ) : (
      <SubItemTextCell
        cellValue={cellData}
        propertyIndex={cellIndex}
        itemIndex={rowIndex}
        updateCell={(val: any, property: string) => {
          onChange(rowIndex, property, val);
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Table borderStyle={styles.tableBorder}>
        <TableHeader
          columnNames={["Item Name", "Price", "Quantity", "Actions"]}
        />
        {tableData.map((rowData: any, index: number) => (
          <TableWrapper key={index} style={styles.tableRow}>
            {rowData.map((cellData: any, cellIndex: number) => (
              <Cell
                key={cellIndex}
                data={CellContent(cellData, cellIndex, index)}
                textStyle={styles.cellText}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
      <GreenOutlineBtn
        handleClick={() => props.onAdd()}
        buttonText="Add Sub Expense"
      />
    </View>
  );
};

import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import { SubItem } from "@/models/SubItem";
import { FieldArray } from "formik";
import React, { useState } from "react";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { ActionButton } from "../Cells/ActionButton";
import GreenOutlineBtn from "../GreenOutlineBtn";
import SubItemTextCell from "../Cells/SubItemTextCell";
import { TableHeader } from "../Cells/TableHeader";

export const FieldListV2 = (props: any) => {
  const { label, name, onChange } = props;
  const [removeItem, setRemoveMethod] = useState<any>();
  const CellContent = (
    cellData: any,
    cellIndex: number,
    remove: any,
    rowIndex: number
  ) => {
    return rowIndex > 0 && cellIndex === 3 ? 
      <ActionButton text="Remove" handleClick={() => removeItem(rowIndex)} />
     : 
      <SubItemTextCell
        cellValue={cellData}
        propertyIndex={cellIndex}
        itemIndex={rowIndex}
        updateCell={(val: any, property: string) => {
          onChange(`subExpenses[${rowIndex}][${property}]`, val);
        }}
      />
    ;
  };
  return (
    <View style={{ backgroundColor: "rgb(188, 189, 203)" }}>
      <Text style={{ paddingLeft: 10 }}>{label}</Text>
      <FieldArray name={name}>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          // setRemoveMethod((i: number) => remove(i));
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
              <Table borderStyle={styles.tableBorder}>
              <TableHeader columnNames={["Item Name", "Price", "Quantity", "Actions"]} />

                {/* SubItemTableData subItems to convert to table data */}
                {tableData.map((rowData: any, index: number) => (
                  <TableWrapper key={index} style={styles.tableRow}>
                    {rowData.map((cellData: any, cellIndex: number) => (
                      <Cell
                        key={cellIndex}
                        data={CellContent(cellData, cellIndex, remove, index)}
                        textStyle={styles.cellText}
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
};

import { styles } from "@/assets/globalStyles";
import { SubExpenseHistoryItem } from "@/models/SubItem";
import React from "react";
import { TableHeader } from "@/components/Cells/TableHeader";
import { ScrollView } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
export default function SubExpenseHistoryTable(props: any) {
    const data = {
      tableHead:["Grocery Item", "Cost", "Date"],
      tableData: props.subexpenses
      .map((subItem: SubExpenseHistoryItem) => [
        subItem.name,
        subItem.cost,
        subItem.date,
      ])
    };
    
  return (
    <ScrollView>
      <Table borderStyle={styles.tableBorder}>
        <TableHeader columnNames={data.tableHead} />
        {data.tableData
          .map((rowData: any, index: number) => (
            <TableWrapper key={index} style={styles.tableRow}>
              {rowData.map((cellData: any, cellIndex: number) => (
                <Cell
                  key={cellIndex}
                  data={cellData}
                  textStyle={styles.cellText}
                />
              ))}
            </TableWrapper>
          ))}
      </Table>
    </ScrollView>
  );
}

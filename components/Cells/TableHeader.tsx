import { styles } from "@/assets/globalStyles";
import React from "react";
import { Row, TableWrapper } from "react-native-table-component";
export const TableHeader = (props: any) => {
  return (
    <TableWrapper borderStyle={styles.tableBorder}>
      <Row
        data={props.columnNames}
        style={styles.header}
        textStyle={styles.headerText}
      />
    </TableWrapper>
  );
};

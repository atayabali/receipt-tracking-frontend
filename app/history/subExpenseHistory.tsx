import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import { deleteExpense, fetchExpenses } from "@/services/expenseService";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ExpenseTableV2 from "@/components/ExpenseTable";
import { Expense } from "@/models/Expense";
import ConfirmCancelAlert from "@/components/Alerts/ConfirmCancelAlert";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { fetchAllSubItemsSearchOptional } from "@/services/subexpenseService";
import { SubExpenseHistoryItem } from "@/models/SubItem";
import { SearchBar } from "@rneui/themed";

import { Cell, Table, TableWrapper } from "react-native-table-component";
import { TableHeader } from "@/components/Cells/TableHeader";
import { ScrollView } from "react-native";
import _ from 'lodash';

export default function SubExpenseHistory() {
  const router = useRouter();
  const [subexpenses, setSubExpenses] = useState<SubExpenseHistoryItem[]>([]);
  const [search, setSearch] = useState(''); 
  //   const [dateOrder, setDateOrder] = useState("desc");
  const [refresh, setRefresh] = useState(true);


  const getSubExpenses = async (query: string) => {
    fetchAllSubItemsSearchOptional(query)
      .then(setSubExpenses)
      .catch(console.error);
    setRefresh(false);
  };

//   const handler = useCallback(debounce(getSubExpenses, 2000), []);
const debouncedGetSubExpenses = useCallback(_.debounce((query) => getSubExpenses(query), 1000), []);

  const onSearch = (val: string) => {
      setSearch(val);
      debouncedGetSubExpenses(val);
    //   getSubExpenses();
    //   useCallback(_.debounce(getSubExpenses, 2000), []);
   };

  useEffect(() => {
    if (refresh) {
      getSubExpenses(search);
    }
  }, [refresh]); // The function only runs when property is true

  // https://reactnavigation.org/docs/use-focus-effect/
  //useFocusEffect - to run side-effects when a screen is focused. A side effect may involve things like adding an event listener, fetching data,
  useFocusEffect(
    useCallback(() => {
      getSubExpenses(search)
    }, [])
  );

  return (
    <View style={styles.tableContainer}>
        <SearchBar 
        placeholder="Search for item"
        onChangeText={onSearch}
        value={search}/>
        <Text>Retrieving {search.length > 0 ? `items that contains '${search}'` : "all items"}</Text>
        <ScrollView>
          <Table borderStyle={styles.tableBorder}>
            <TableHeader columnNames={['Grocery Item', 'Cost', 'Date']} />
            {subexpenses.map((subItem: SubExpenseHistoryItem) => [
                  subItem.name,
                  subItem.cost,
                  subItem.date,
                ]).map((rowData: any, index: number) => (
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
    </View>
  );
}

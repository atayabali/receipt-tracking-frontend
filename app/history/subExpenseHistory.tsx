import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import { SubExpenseHistoryItem } from "@/models/SubItem";
import { fetchAllSubItemsSearchOptional } from "@/services/subexpenseService";
import { useFocusEffect } from "@react-navigation/native";
import { SearchBar } from "@rneui/themed";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { TableHeader } from "@/components/Cells/TableHeader";
import _ from "lodash";
import { ScrollView } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import SubExpenseHistoryTable from "@/components/Tables/SubExpenseHistoryTable";

export default function SubExpenseHistory() {
  const router = useRouter();
  const [subexpenses, setSubExpenses] = useState<SubExpenseHistoryItem[]>([]);
  const [search, setSearch] = useState("");

  const getSubExpenses = async (query: string) => {
    fetchAllSubItemsSearchOptional(query)
      .then(setSubExpenses)
      .catch(console.error);
  };

  //   useCallback ensures debouncedFetch remains stable across re-renders.
  //   _.debounce delays execution until after 1 second of inactivity.
  //   Only the last API call executes, canceling previous calls if a new character is typed within the debounce delay.
  const debouncedGetSubExpenses = useCallback(
    _.debounce((query) => getSubExpenses(query), 1000),
    []
  );

  const onSearch = (val: string) => {
    setSearch(val);
    debouncedGetSubExpenses(val);
  };

  //useFocusEffect - to run side-effects when a screen is focused. A side effect may involve things like adding an event listener, fetching data,
  useFocusEffect(
    useCallback(() => {
      getSubExpenses(search);
    }, [])
  );

  return (
    <View style={styles.tableContainer}>
      <SearchBar
        placeholder="Search for item"
        onChangeText={onSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchInputContainer}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />
      <Text>
        Retrieving{" "}
        {search.length > 0 ? `items that contain '${search}'` : "all items"}
      </Text>
      <SubExpenseHistoryTable subexpenses={subexpenses}/>
    </View>
  );
}

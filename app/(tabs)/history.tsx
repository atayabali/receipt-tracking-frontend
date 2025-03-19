import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useState } from "react";
import ExpenseHistory from "../history/expenseHistory";
import SubExpenseHistory from "../history/subExpenseHistory";

export default function History() {
  const [selectedIndex, setIndex] = useState(0);

  return (
    <View style={styles.tableContainer}>
      <Title title="Expense History"></Title>
      <SegmentedControl
        values={["Expenses", "Subexpenses"]}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setIndex(event.nativeEvent.selectedSegmentIndex)
          console.log(event);
        }}
        style={{marginRight: 50, marginLeft: 50, marginBottom: 10 }}
        tintColor="rgb(6, 68, 32)"
        backgroundColor="rgb(73, 73, 76)"
      >
      </SegmentedControl>

      {selectedIndex === 0 ? <ExpenseHistory/> : <SubExpenseHistory/>}

    </View>
  );
}

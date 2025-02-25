import { styles } from "@/assets/globalStyles";
import SubItemTableV2 from "@/components/SubItemTableV2";
import Title from "@/components/Title";
import { SubItem } from "@/models/SubItem";
import { fetchSubItemsByExpenseId } from "@/services/subexpenseService";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function ExpenseOverview() {
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    var expenseId = searchParams.get("expenseId");
    if (expenseId != null) {
      fetchSubItemsByExpenseId(expenseId).then(setSubItems).catch(console.error);
    }
  }, []);

  const merchant = searchParams.get("merchant");
  const expenseDate = searchParams.get("expenseDate");
  const totalCost = searchParams.get("totalCost");
  var expenseSummary = `$${totalCost} at ${merchant} on ${expenseDate}`;

  return (
    <View style={styles.tableContainer}>
      <Title title={expenseSummary} />
      <SubItemTableV2 subItems={subItems}/>
    </View>
  );
}

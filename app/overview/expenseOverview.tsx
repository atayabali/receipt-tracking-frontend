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
const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    const getSubExpenses = async (expenseId: string) => {
      fetchSubItemsByExpenseId(expenseId).then(setSubItems).catch(console.error);
      setRefresh(false);
    }
    var expenseId = searchParams.get("expenseId");
    if (expenseId != null && refresh) {
      getSubExpenses(expenseId);
    }
  }, [refresh]);

  const merchant = searchParams.get("merchant");
  const expenseDate = searchParams.get("expenseDate");
  const totalCost = searchParams.get("totalCost");
  var expenseSummary = `$${totalCost} at ${merchant} on ${expenseDate}`;

  return (
    <View style={styles.tableContainer}>
      <Title title={expenseSummary} />
      <SubItemTableV2 subItems={subItems} onDelete={() => setRefresh(true)}/>
    </View>
  );
}

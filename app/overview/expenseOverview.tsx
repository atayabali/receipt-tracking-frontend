import { styles } from "@/assets/globalStyles";
import SubItemHeaders from "@/components/SubItemHeaders";
import SubItemTable from "@/components/SubItemTable";
import Title from "@/components/Title";
import axios from "axios";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";

var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";

var urlPrefix = `http://${localhost}:5000`; //I really need to set this globally

const fetchSubItems = async (expenseId: string): Promise<SubItem[]> => {
  const response = await axios.get<SubItem[]>(
    `${urlPrefix}/api/v1/subexpenses/${expenseId}`
  );
  return response.data;
};
export default function ExpenseOverview() {
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    var expenseId = searchParams.get("expenseId");
    if (expenseId != null) {
      fetchSubItems(expenseId).then(setSubItems).catch(console.error);
    }
  }, []);
  const merchant = searchParams.get("merchant");
  const expenseDate = searchParams.get("expenseDate");
  const totalCost = searchParams.get("totalCost");
  var expenseSummary = `Summary: $${totalCost} at ${merchant} on ${expenseDate}`

  return (
    <View style={styles.tableContainer}>
      <Title title={expenseSummary}/>
      <SubItemHeaders />
      <SubItemTable subItems={subItems} />
    </View>
  );
}

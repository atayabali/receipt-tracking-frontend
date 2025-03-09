import { styles } from "@/assets/globalStyles";
import TotalsDisplay from "@/components/Forms/TotalsDisplay";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
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
  const [createProcess, setCreateProcess] = useState(false);

  useEffect(() => {
    const getSubExpenses = async (expenseId: string) => {
      fetchSubItemsByExpenseId(expenseId)
        .then(setSubItems)
        .catch(console.error);
      setRefresh(false);
    };
    var expenseId = searchParams.get("expenseId");
    if (expenseId != null && refresh) {
      getSubExpenses(expenseId);
    }
  }, [refresh]);

  const addSubItem = () => {
    setSubItems([
      ...subItems,
      { id: null, name: "", cost: "0", quantity: "0" },
    ]);
  };

  const updateItem = (index: number, key: string, newValue: any) => {
    setSubItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [key]: newValue } : item
      )
    );
  };

  const merchant = searchParams.get("merchant");
  const expenseDate = searchParams.get("expenseDate");
  const totalCost = searchParams.get("totalCost") ?? "0";
  var expenseSummary = `$${totalCost} at ${merchant} on ${expenseDate}`;

  return (
    <View style={styles.tableContainer}>
      <Title title={expenseSummary} />
      <TotalsDisplay
        totalCost={parseFloat(totalCost)}
        subItems={subItems}
      />
      <SubItemTableV2
        subItems={subItems}
        updateItem={updateItem}
        onDelete={() => setRefresh(true)}
        onAdd={() => {
          setRefresh(true);
          setCreateProcess(false);
        }}
        expenseId={searchParams.get("expenseId")}
      />

      {
        <GreenOutlineBtn
          buttonText="Add Sub Item"
          disabled={createProcess}
          handleClick={() => {
            addSubItem();
            setCreateProcess(true);
          }}
        />
      }
    </View>
  );
}

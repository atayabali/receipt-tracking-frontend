import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import React, { useEffect } from "react";
import FormikContainer from "@/components/Forms/FormikContainer";

export default function AddExpense() {
  // const router = useRouter();
  //api request works but don't want to call server every time right now so hardcoded
  // const [expenses, setExpenses] = useState<Expense[]>([]);
  // const [sortBy, setSortBy] = useState("desc");
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Title title="Manual Expense Entry"></Title>
      <FormikContainer />
    </View>
  );
}

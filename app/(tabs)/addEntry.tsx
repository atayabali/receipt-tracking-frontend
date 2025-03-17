import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import React from "react";
import FormikContainer from "@/components/Forms/FormikContainer";

export default function AddExpense() {
  return (
    <View style={styles.container}>
      <Title title="Manual Expense Entry"></Title>
      <FormikContainer />
    </View>
  );
}

import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import React from "react";
import FormikContainer from "@/components/Forms/FormikContainer";
import { useAuth } from "@/services/authContext";
import { setAccessToken } from "@/services/api";

export default function AddExpense() {
    const { accessToken } = useAuth(); // Get token from context
  
    // Set the token provider dynamically
    setAccessToken(accessToken);
  return (
    <View style={styles.container}>
      <Title title="Manual Expense Entry"></Title>
      <FormikContainer />
    </View>
  );
}

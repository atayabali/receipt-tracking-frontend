import { styles } from "@/assets/globalStyles";
import { Text } from "@/components/Themed";
import React from "react";
import { TextInput } from "react-native";

export default function Input(props: any) {
  const { label, name, value, onChange, errors, touched } = props;

  return (
    <>
      <Text>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(val) => onChange(val)}
        style={styles.input}
      />
      {touched[name] && errors[name] && (
        <Text style={styles.error}>{errors[name]}</Text>
      )}
    </>
  );
}

import { styles } from "@/assets/globalStyles";
import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";
import { View, Text } from "@/components/Themed";
import { CheckBox } from "@rneui/themed";

function Checkbox(props: any) {
  const { label, value, onClick } = props;
  return (
    <View className="form-control" style={styles.formControl}>
      <CheckBox
        title={label}
        checked={value}
        style={styles.input}
        onPress={onClick}
      />
    </View>
  );
}

export default Checkbox;

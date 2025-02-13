import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import { CheckBox } from "@rneui/themed";
import React from "react";

function Checkbox(props: any) {
  const { label, value, onClick } = props;
  return (
    <View className="form-control" style={styles.formControl}>
      <CheckBox
        title={label}
        checked={value}
        wrapperStyle={styles.checkbox}
        onPress={onClick}
      />
    </View>
  );
}

export default Checkbox;

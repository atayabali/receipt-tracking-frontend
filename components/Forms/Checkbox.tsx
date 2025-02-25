import { styles } from "@/assets/globalStyles";
import { CheckBox } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

function Checkbox(props: any) {
  const { label, value, onClick } = props;
  return (
    <View style={{display: "flex", alignItems: "center", backgroundColor: 'rgb(188, 189, 203)' }}>
      <CheckBox
        title={label}
        checked={value}
        containerStyle={{ backgroundColor: "rgb(188, 189, 203)" }}
        wrapperStyle={styles.checkbox}
        onPress={onClick}
        uncheckedColor="#000000"
      />
    </View>
  );
}

export default Checkbox;

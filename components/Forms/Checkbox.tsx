import { styles } from "@/assets/globalStyles";
import { CheckBox } from "@rneui/themed";
import React from "react";

function Checkbox(props: any) {
  const { label, value, onClick } = props;
  return (
    <>
      <CheckBox
        title={label}
        checked={value}
        containerStyle={{ backgroundColor: "rgb(188, 189, 203)" }}
        wrapperStyle={styles.checkbox}
        onPress={onClick}
        uncheckedColor="#000000"
      />
    </>
  );
}

export default Checkbox;

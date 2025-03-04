import { styles } from "@/assets/globalStyles";
import { Text } from "@/components/Themed";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function GreenOutlineBtn(props: any) {
  return (
    <View style={{ display: "flex", alignItems: "center", margin: 5, zIndex: -1}}>
      <TouchableOpacity
        disabled={props.disabled ?? false}
        style={styles.buttonStyle}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={props.handleClick}
      >
        <Text style={{ color: "rgb(0, 62, 41)" }}>{props.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

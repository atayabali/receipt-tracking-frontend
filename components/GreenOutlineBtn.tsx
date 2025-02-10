import { styles } from "@/assets/globalStyles";
import { Text } from "@/components/Themed";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function GreenOutlineBtn(props: any) {
  return (
    <TouchableOpacity 
    style={styles.buttonStyle} 
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    onPress={props.handleClick}>
            <Text style={{ color: "rgb(0, 62, 41)"}}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
}

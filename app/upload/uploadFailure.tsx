import { Text, View } from "@/components/Themed";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
export default function UploadFailure (props: any) {
  return (
    <View style={{alignItems: 'center', backgroundColor:  "rgb(188, 189, 203)"}}>
    <Text>{props.message}</Text>
    <FontAwesome6
      name="xmark"
      size={60}
      color="red"
      style={{ alignSelf: "center" }}
    />
  </View>
  )
}
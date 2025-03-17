import { Text, View } from "@/components/Themed";
import React from "react";
import * as Progress from "react-native-progress";

export default function ProgressCircle(props: any) {
  return (
    <View style={{alignItems: 'center', backgroundColor:  "rgb(188, 189, 203)"}}>
            <Text>{props.message} </Text>
            <Progress.Circle size={30} indeterminate={true} />
          </View>
  )
}

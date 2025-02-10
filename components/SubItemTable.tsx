import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import React from "react";
import { FlatList } from "react-native";

export default function SubItemTable(props: any) {
  return (
   <FlatList
           data={props.subItems}
           keyExtractor={(item) => item.id.toString()}
           renderItem={({ item }) => (
             <View style={styles.row}>
               <Text style={styles.cell}>{item.name}</Text>
               <Text style={styles.cell}>{item.cost}</Text>
               <Text style={styles.cell}>{item.quantity}</Text>
             </View>
           )}
         />
  );
}


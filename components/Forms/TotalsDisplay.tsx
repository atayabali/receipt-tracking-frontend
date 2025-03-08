import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { SubExpense, SubItem } from "@/models/SubItem";
const calculateSubTotal = (subItems: SubExpense[] | SubItem[]) => {
  let subTotal = 0;
  if (subItems?.length === 0) return subTotal;
  subItems.forEach((item) => {
    var cost =
      typeof item.cost === "string" ? parseFloat(item.cost) : item.cost;
    var quantity =
      typeof item.quantity === "string"
        ? parseFloat(item.quantity)
        : item.quantity;
    if(Number.isNaN(cost) || Number.isNaN(quantity) || cost <= 0 || quantity <= 0) subTotal += 0;
    else subTotal += cost * quantity;
  });
  return subTotal;
};

const TotalsDisplay = (props: {
  totalCost: number;
  subItems: SubItem[] | SubExpense[];
}) => {
  const [subItemsTotal, setSubTotal] = useState(0);

  useEffect(() => {
    var subTotal = calculateSubTotal(props.subItems);
    setSubTotal(subTotal);
  }, [props.subItems]);

  return (
    <View style={{ paddingLeft: 10, backgroundColor: "rgb(188, 189, 203)" }}>
      <Text>Total Cost: {props.totalCost}</Text>
      <Text>Sub Items Total: {subItemsTotal}</Text>
      <Text>Difference: {props.totalCost - subItemsTotal}</Text>
    </View>
  );
};

export default TotalsDisplay;

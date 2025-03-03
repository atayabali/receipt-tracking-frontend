import { SubExpense } from "@/models/SubItem";

export const calculateSubTotal = (subItems: SubExpense[]) => {
  let subTotal = 0;
  subItems.forEach((item) => {
    if(item.cost <= 0 || item.quantity <= 0) subTotal+=0;
    subTotal += item.cost * item.quantity;
  });
  return subTotal;
};

export const checkSubItems = (subItems: SubExpense[], expenseTotal: number) => {
  console.log(subItems);
  console.log(expenseTotal);
  var invalidSubItemsExist = subItems.some(
    (sub) => sub.name.length === 0 || sub.cost <= 0 || sub.quantity < 0 || sub.cost.toString().length == 0 || sub.quantity.toString().length == 0
  );
  console.log(invalidSubItemsExist);
  if (invalidSubItemsExist) return "incomplete";

  let subTotal = 0;
  subItems.forEach((item) => {
    subTotal += item.cost * item.quantity;
  });

  if (subTotal != expenseTotal) {
    return "unequal";
  }

  return "complete";
};

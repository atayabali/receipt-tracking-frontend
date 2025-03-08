import { SubExpense } from "@/models/SubItem";

export const checkSubItems = (subItems: SubExpense[], expenseTotal: number) => {
  // console.log(subItems);
  // console.log(expenseTotal);
  var invalidSubItemsExist = subItems.some(
    (sub) => sub.name.length === 0 || sub.cost <= 0 || sub.quantity < 0 || sub.cost.toString().length == 0 || sub.quantity.toString().length == 0
  );

  if (invalidSubItemsExist) return "incomplete";

  return "complete";
};

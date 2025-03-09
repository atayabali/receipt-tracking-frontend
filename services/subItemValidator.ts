import { SubExpense } from "@/models/SubItem";

//check for invalid sub items on form submit
export const checkSubItems = (subItems: SubExpense[], expenseTotal: number) => {
  return subItems.some(
    (sub) => sub.name.length === 0 || sub.cost <= 0 || sub.quantity < 0 || sub.cost.toString().length == 0 || sub.quantity.toString().length == 0
  ) ? "incomplete" : "complete";
};

import { Expense, ExpenseFormValues, ExpenseRequestBody } from "@/models/Expense";
import axios from "axios";
import { urlPrefix } from "./configureUrl";

// http://:5000/api/v1/expenses/all
export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get<Expense[]>(
    `${urlPrefix}/api/v1/expenses/all`
  );
  return response.data;
};

export const postExpense = async (
  expenseInfo: ExpenseFormValues
): Promise<Expense[]> => {
  var body: ExpenseRequestBody = {
    merchant: expenseInfo.expenseName,
    totalCost: expenseInfo.totalCost,
    expenseDate: expenseInfo.expenseDate.toISOString().split("T")[0],
    includeBreakdown: expenseInfo.costBreakdown,
    subExpenses: expenseInfo.costBreakdown ? expenseInfo.subExpenses : [],
    imageKey: expenseInfo.imageKey
  };
  const response = await axios.post(`${urlPrefix}/api/v1/expenses`, body);
  return response.data;
};

export const deleteExpense = async (expenseId: string) => {
  try {
    const response = await axios.delete(
      `${urlPrefix}/api/v1/expenses/${expenseId}`
    );
    return response.status;
  } catch (e: any) {
    return 500;
  }
};



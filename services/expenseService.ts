import { Expense, ExpenseFormValues, ExpenseRequestBody } from "@/models/Expense";
import api from "./api";

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await api.get<Expense[]>('/expenses/all');
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
  const response = await api.post('/expenses', body);
  return response.data;
};

export const deleteExpense = async (expenseId: string) => {
  try {
    const response = await api.delete(`/expenses/${expenseId}`);
    return response.status;
  } catch (e: any) {
    return 500;
  }
};

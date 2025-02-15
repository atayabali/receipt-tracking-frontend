import { MyFormValues, SubExpense } from "@/components/Forms/FormikContainer";
import axios from "axios";
import { Platform } from "react-native";

var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";

var urlPrefix = `http://${localhost}:5000`; //I really need to set this globally

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get<Expense[]>(
    `${urlPrefix}/api/v1/expenses/all`
  );
  return response.data;
};

export const fetchSubItems = async (expenseId: string): Promise<SubItem[]> => {
  const response = await axios.get<SubItem[]>(
    `${urlPrefix}/api/v1/subexpenses/${expenseId}`
  );
  return response.data;
};

export const postExpense = async (expenseInfo: MyFormValues): Promise<Expense[]> => {
  var body: ExpenseRequestBody = {
    merchant: expenseInfo.expenseName, 
    totalCost: expenseInfo.totalCost,
    expenseDate: expenseInfo.expenseDate.toISOString().split('T')[0],
    includeBreakdown: expenseInfo.costBreakdown,
    subItems: expenseInfo.costBreakdown ? expenseInfo.subExpenses : []
  }
  const response = await axios.post(
    `${urlPrefix}/api/v1/expenses`, body
  );
  return response.data;
};


interface ExpenseRequestBody {
  merchant: string;
  totalCost: number;
  expenseDate: string;
  includeBreakdown: boolean;
  subItems: Array<SubExpense>;
}
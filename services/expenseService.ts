import { MyFormValues, SubExpense } from "@/components/Forms/FormikContainer";
import { Expense } from "@/models/Expense";
import axios from "axios";
import { Platform } from "react-native";
var checkAWS = false;
var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";
localhost = checkAWS ? "54.89.224.122" : localhost;
var urlPrefix = `http://${localhost}:5000`; //I really need to set this globally
console.log(urlPrefix);
// http://:5000/api/v1/expenses/all
export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get<Expense[]>(
    `${urlPrefix}/api/v1/expenses/all`
  );
  // console.log(response);
  return response.data;
};

export const postExpense = async (expenseInfo: MyFormValues): Promise<Expense[]> => {
  var body: ExpenseRequestBody = {
    merchant: expenseInfo.expenseName, 
    totalCost: expenseInfo.totalCost,
    expenseDate: expenseInfo.expenseDate.toISOString().split('T')[0],
    includeBreakdown: expenseInfo.costBreakdown,
    subExpenses: expenseInfo.costBreakdown ? expenseInfo.subExpenses : []
  }
  const response = await axios.post(
    `${urlPrefix}/api/v1/expenses`, body
  );
  console.log(response);
  return response.data;
};

export const deleteExpense = async (expenseId: string) => {
  try{
    const response = await axios.delete(
      `${urlPrefix}/api/v1/expenses/${expenseId}`
    );
      return response.status;
  } catch(e){
      console.log(e.response);
      return e.response.status;
  }
}

interface ExpenseRequestBody {
  merchant: string;
  totalCost: number;
  expenseDate: string;
  includeBreakdown: boolean;
  subExpenses: Array<SubExpense>;
}
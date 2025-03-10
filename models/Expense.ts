import { SubExpense } from "./SubItem";

export interface Expense {
    id: number;
    merchant: string;
    totalCost: string; //number
    date: string;
    hasSubItems: boolean;
    imageKey: string | null;
}


export interface ExpenseFormValues {
  expenseName: string;
  totalCost: number;
  expenseDate: Date;
  costBreakdown: boolean;
  subExpenses: Array<SubExpense>;
  imageKey: string | null;
}

export interface ExpenseRequestBody {
    merchant: string;
    totalCost: number;
    expenseDate: string;
    includeBreakdown: boolean;
    subExpenses: Array<SubExpense>;
    imageKey: string | null;
  }
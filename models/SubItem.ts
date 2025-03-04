export interface SubItem {
    id: number | null;
    name: string;
    cost: string; 
    quantity: string;
}

export interface SubExpense {
    name: string;
    cost: number;
    quantity: number;
  }

  export interface SubItemRequestBody {
    expenseId: number;
    name: string;
    cost: number; 
    quantity: number;
  }
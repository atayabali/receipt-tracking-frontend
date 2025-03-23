import { SubExpenseHistoryItem, SubItem, SubItemRequestBody } from "@/models/SubItem";
import axios from "axios";
import api from "./api";

export const fetchSubItemsByExpenseId = async (
  expenseId: string
): Promise<SubItem[]> => {
  const response = await api.get<SubItem[]>(`/subexpenses/byexpense/${expenseId}`);
  return response.data;
};

export const fetchAllSubItemsSearchOptional = async (searchQuery: string) => {
  const response = await api.get<SubExpenseHistoryItem[]>(`/subexpenses/all/${searchQuery}`);
  return response.data;
}

export const deleteSubItemById = async (subItemId: string) => {
  try {
    const response = await api.delete(`/subexpenses/${subItemId}`);
    return response.status;
  } catch (e) {
    return 500;
  }
};

export const postSubItem = async (body: SubItemRequestBody) => {
  try {
    const response = await api.post(`/subexpenses/`, body);
    return response.status;
  } catch (e) {
    return 500;
  }
}

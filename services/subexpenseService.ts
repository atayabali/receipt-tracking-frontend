import { SubExpenseHistoryItem, SubItem, SubItemRequestBody } from "@/models/SubItem";
import axios from "axios";
import { urlPrefix } from "./configureUrl";

export const fetchSubItemsByExpenseId = async (
  expenseId: string
): Promise<SubItem[]> => {
  const response = await axios.get<SubItem[]>(
    `${urlPrefix}/api/v1/subexpenses/byexpense/${expenseId}`
  );
  return response.data;
};

export const fetchAllSubItemsSearchOptional = async (searchQuery: string) => {
  const response = await axios.get<SubExpenseHistoryItem[]>(
    `${urlPrefix}/api/v1/subexpenses/all/${searchQuery}`
  );
  return response.data;
}

export const deleteSubItemById = async (subItemId: string) => {
  try {
    const response = await axios.delete(
      `${urlPrefix}/api/v1/subexpenses/${subItemId}`
    );
    return response.status;
  } catch (e) {
    return 500;
  }
};

export const postSubItem = async (body: SubItemRequestBody) => {

  try {
    const response = await axios.post(
      `${urlPrefix}/api/v1/subexpenses/`, body
    );
    return response.status;
  } catch (e) {
    return 500;
  }
}

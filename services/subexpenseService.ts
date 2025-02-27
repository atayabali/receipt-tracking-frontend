import { SubItem } from "@/models/SubItem";
import axios from "axios";
import { urlPrefix } from "./configureUrl";

export const fetchSubItemsByExpenseId = async (
  expenseId: string
): Promise<SubItem[]> => {
  const response = await axios.get<SubItem[]>(
    `${urlPrefix}/api/v1/subexpenses/${expenseId}`
  );
  // console.log(response);
  return response.data;
};

export const deleteSubItemById = async (subItemId: string) => {
  try {
    const response = await axios.delete(
      `${urlPrefix}/api/v1/subexpenses/${subItemId}`
    );
    return response.status;
  } catch (e) {
    console.log(e.response);
    return e.response.status;
  }
};

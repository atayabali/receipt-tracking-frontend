import { SubItem } from "@/models/SubItem";
import axios from "axios";
import { Platform } from "react-native";
var checkAWS = false;
var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";
localhost = checkAWS ? "54.89.224.122" : localhost;
var urlPrefix = `http://${localhost}:5000`; //I really need to set this globally
console.log(urlPrefix);
export const fetchSubItemsByExpenseId = async (expenseId: string): Promise<SubItem[]> => {
  const response = await axios.get<SubItem[]>(
    `${urlPrefix}/api/v1/subexpenses/${expenseId}`
  );
  // console.log(response);
  return response.data;
};

export const deleteSubItemById = async (subItemId: string) => {
    try{
        const response = await axios.delete(`${urlPrefix}/api/v1/subexpenses/${subItemId}`);
        return response.status;
    } catch(e){
        console.log(e.response);
        return e.response.status;
    }
}
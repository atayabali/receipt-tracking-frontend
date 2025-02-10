import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import React, { useEffect } from "react";
import {
  Platform
} from "react-native";
  var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";
  var urlPrefix = `http://${localhost}:5000`;
  
  // const fetchExpenses = async (): Promise<Expense[]> => {
  //   const response = await axios.get<Expense[]>(
  //     `${urlPrefix}/api/v1/expenses/all`
  //   );
  //   console.log(response);
  //   return response.data;
  // };
  
  export default function AddExpense() {
    // const router = useRouter();
    //api request works but don't want to call server every time right now so hardcoded
    // const [expenses, setExpenses] = useState<Expense[]>([]);
    // const [sortBy, setSortBy] = useState("desc");
  
  
    useEffect(() => {
    }, []);

    return (
      <View style={styles.container}>
        <Title title="Manual Expense Entry"></Title>
      
      </View>
    );
  }
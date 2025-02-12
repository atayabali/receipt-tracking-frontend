// import { Field, FieldArray } from "formik";
// import React from "react";
// import { SubExpense } from "./FormikContainer";
// import { View, Text } from "@/components/Themed";
// import { Button } from "react-native";

// function FieldList(props: any) {
//   const { label, name, ...rest } = props;
//   return (
//     <View>
//       <Text>{label}</Text>
//       <FieldArray name={name}>
//         {(fieldArrayProps) => {
//           // console.log('fieldProps', fieldArrayProps); //fieldArrayProps knows subExpenseNames because it is defined as name= in FieldArray component
//           const { push, remove, form } = fieldArrayProps;
//           const { values } = form;
//           const { subExpenses } = values;

//           return (
//             <View>
//               {subExpenses.map((subExpense: SubExpense, index: number) => (
//                 <View key={index}>
//                     <Text>Item Name: </Text>
//                     <Text>Item Cost: </Text>
//                     <Text>Item Quantity: </Text>
//                   <Field name={`subExpenses[${index}].name`} />
// =                  <Field name={`subExpenses[${index}].cost`} />
//                   <Field name={`subExpenses[${index}].quantity`} />

//                   {index > 0 && (
//                     <Button title="Remove" onPress={() => remove(index)}/>
//                   )}
//                 </View>
//               ))}
//               <Button
//                 title="Add Sub Expense"
//                 onPress={() => push({ name: "", cost: 0, quantity: 1 })}          
//               />
//             </View>
//           );
//         }}
//       </FieldArray>
//     </View>
//   );
// }

// export default FieldList;

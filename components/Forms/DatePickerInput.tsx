// import { styles } from "@/assets/globalStyles";
// import { ErrorMessage, Field } from "formik";
// import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import TextError from "./TextError";
// import { View, Text } from "@/components/Themed";


// export default function DatePickerInput(props: any) {
//   const { label, name, ...rest } = props;
//   return (
//     <View style={styles.formControl}>
//       <Text>{label}</Text>
//       {/* <Field name={name}>
//         {({ form, field }) => {
//           const { setFieldValue } = form;
//           const { value } = field;
//           return (
//             <DatePicker
//               selected={value}
//               onChange={(date) =>
//                 setFieldValue(
//                   name,
//                   date?.toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "2-digit",
//                     day: "2-digit",
//                   })
//                 )
//               }
//             />
//           );
//         }}
//       </Field> */}
//       <ErrorMessage name={name} component={TextError} />
//     </View>
//   );
// }

import React from "react";
import { Field, FieldArray, Form, Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { Button } from "react-native";
import GreenOutlineBtn from "../GreenOutlineBtn";
import TextError from './TextError';
import { View, Text } from "@/components/Themed";
import { TextInput } from 'react-native';
import { styles } from "@/assets/globalStyles";
export interface SubExpense {
  name: string;
  cost: number;
  quantity: number;
}

interface MyFormValues {
  expenseName: string;
  totalCost: number;
  expenseDate: Date;
  costBreakdown: boolean;
  subExpenses: Array<SubExpense>;
}

export default function FormikContainer(props: any) {
  const initialValues: MyFormValues = {
    expenseName: "",
    totalCost: 0.0,
    expenseDate: new Date(),
    costBreakdown: false,
    subExpenses: [{name: '', cost: 0, quantity: 1}],
  };
  const ExpenseValidationSchema = Yup.object().shape({
    expenseName: Yup.string().required("Required"),
    totalCost: Yup.number().required().positive(),
    expenseDate: Yup.date().required(),
    costBreakdown: Yup.boolean(),
  });
  const onSubmit = (values: any) => console.log(values);

  return (
    <View style={styles.formControl}>
      <Formik
        initialValues={initialValues}
        validationSchema={ExpenseValidationSchema}
        onSubmit={onSubmit}
      >
        {({values, errors, touched, handleChange, handleSubmit, dirty, isValid}) => (
          <View style={styles.formControl}>
            <FormikControl
              onChange={handleChange('expenseName')}
              control="input"
              label="Expense Location: "
              name={values.expenseName}
              errors={errors}
              touched={touched}
            />
            <FormikControl
              onChange={handleChange('expenseName')}
              control="input"
              label="Total Cost: "
              name={values.totalCost}
              errors={errors}
              touched={touched}
            />

            {/* 

            <FormikControl
              control="date"
              label="Expense Date: "
              name="expenseDate"
            />

            <FormikControl
              control="checkbox"
              label="Include Cost Breakdown? "
              name="costBreakdown"
              type="checkbox"
            />
            {formik.values.costBreakdown && (
              <View>
                <FormikControl 
                control="array"
                label='List of Sub Expenses: '
                name="subExpenses"
                />
              </View>
            )} */}
            {/* <Button title='Restart Form' /> */}

            <GreenOutlineBtn disabled={!(dirty && isValid)} onPress={handleSubmit} buttonText="Submit Expense" />
          </View>
        )}
      </Formik>
    </View>
  );
}

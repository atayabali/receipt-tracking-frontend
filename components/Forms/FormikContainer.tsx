import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import GreenOutlineBtn from "../GreenOutlineBtn";
import FormikControl from "./FormikControl";

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
    subExpenses: [{ name: "", cost: 0, quantity: 1 }],
  };
  const ExpenseValidationSchema = Yup.object().shape({
    expenseName: Yup.string().required("Required"),
    totalCost: Yup.number().required().positive(),
    expenseDate: Yup.date().required(),
    costBreakdown: Yup.boolean(),
  });
  const onSubmit = (values: any) => console.log(values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ExpenseValidationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
        handleBlur,
        dirty,
        isValid,
      }) => (
        <View style={styles.formControl}>
          <FormikControl
            onChange={(name: string) => setFieldValue("expenseName", name)}
            onBlur={handleBlur("expenseName")}
            control="input"
            label="Expense Location: "
            value={values.expenseName}
            name="expenseName"
            errors={errors}
            touched={touched}
          />

          <FormikControl
            onChange={(cost: number) => setFieldValue("totalCost", cost)}
            onBlur={handleBlur("totalCost")}
            control="input"
            label="Total Cost: "
            value={values.totalCost}
            name="totalCost"
            errors={errors}
            touched={touched}
          />

          <FormikControl
            onChange={(date: Date) => setFieldValue("expenseDate", date)}
            value={values.expenseDate}
            name="expenseDate"
            errors={errors}
            touched={touched}
            control="date"
            label="Expense Date: "
          />

          <FormikControl 
            onClick={() => setFieldValue("costBreakdown", !values.costBreakdown)}
            label="Include Cost Breakdown"
            value={values.costBreakdown}
            control="checkbox"
          />

          
            {/* {values.costBreakdown && (
              <View>
                <FormikControl 
                control="array"
                label='List of Sub Expenses: '
                name="subExpenses"
                />
              </View>
            )} */}

          <GreenOutlineBtn
            disabled={!(dirty && isValid)}
            onPress={handleSubmit}
            buttonText="Submit Expense"
          />
        </View>
      )}
    </Formik>
  );
}

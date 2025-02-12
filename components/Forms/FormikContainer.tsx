import React from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={ExpenseValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <FormikControl
              control="input"
              type="text"
              label="Expense Location: "
              name="expenseName"
            />

            <FormikControl
              control="input"
              type="text"
              label="Total Cost: "
              name="totalCost"
            />

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
              <div>
                <FormikControl 
                control="array"
                label='List of Sub Expenses: '
                name="subExpenses"
                />
              </div>
            )}
            <button type="reset">Restart Form</button>
            <button type="submit" disabled={!(formik.dirty && formik.isValid)}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

import { styles } from "@/assets/globalStyles";
import { View } from "@/components/Themed";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import GreenOutlineBtn from "../GreenOutlineBtn";
import FormikControl from "./FormikControl";
import { ScrollView } from "react-native";
import { postExpense } from "@/services/expenseService";
import TextError from "./TextError";
import DismissableAlert from "../Alerts/DismissableAlert";

export interface SubExpense {
  name: string;
  cost: number;
  quantity: number;
}

export interface MyFormValues {
  expenseName: string;
  totalCost: number;
  expenseDate: Date;
  costBreakdown: boolean;
  subExpenses: Array<SubExpense>;
}

export default function FormikContainer(props: any) {
  const [isCreated, setIsCreated] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [subExpenseErrors, setSubExpenseErrors ] = useState(false);
  
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

  const onSubmit = async (values: MyFormValues, { resetForm }: any) => {
    var invalidSubItemsExist = values.subExpenses.some(sub => sub.name.length === 0 || sub.cost <= 0);
    setSubExpenseErrors(invalidSubItemsExist);
    if(invalidSubItemsExist) return;

    await postExpense(values)
      .then((res) => {
        setIsCreated(true);
        resetForm();
      })
      .catch((ex) => {
        setIsFailure(true);
      });
  };

  return (
    <>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          validationSchema={ExpenseValidationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleSubmit,
            dirty,
            isValid,
          }) => {
            return (
              <View style={styles.formControl}>
                <FormikControl
                  onChange={(name: string) =>
                    setFieldValue("expenseName", name)
                  }
                  control="input"
                  label="Expense Location: "
                  value={values.expenseName}
                  name="expenseName"
                  errors={errors}
                  touched={touched}
                />

                <FormikControl
                  onChange={(cost: number) => setFieldValue("totalCost", cost)}
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
                  onClick={() =>
                    setFieldValue("costBreakdown", !values.costBreakdown)
                  }
                  label="Include Cost Breakdown"
                  value={values.costBreakdown}
                  control="checkbox"
                />

                {values.costBreakdown && subExpenseErrors &&
                <TextError children="Sub Items table is incomplete. Please fill out before re-submitting." />
                }
                {values.costBreakdown && (
                  <View>
                    <FormikControl
                      onChange={(name: string, val: any) =>
                        setFieldValue(name, val)
                      }
                      control="array2"
                      label="List of Sub Expenses: "
                      name="subExpenses"
                    />
                  </View>
                )}
                <GreenOutlineBtn
                  disabled={!(dirty && isValid)}
                  handleClick={handleSubmit}
                  buttonText="Submit Expense"
                />
              </View>
            );
          }}
        </Formik>
      </ScrollView>
      <DismissableAlert showAlert={isCreated} title="Expense was created" onDismiss={() => setIsCreated(false)} />
      <DismissableAlert showAlert={isFailure} title="Expense not created" onDismiss={() => setIsFailure(false)} />

    </>
  );
}

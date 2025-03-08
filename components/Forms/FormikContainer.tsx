import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import GreenOutlineBtn from "../GreenOutlineBtn";
import FormikControl from "./FormikControl";
import { ScrollView } from "react-native";
import { postExpense } from "@/services/expenseService";
import TextError from "./TextError";
import DismissableAlert from "../Alerts/DismissableAlert";
import { SubExpense } from "@/models/SubItem";
import { checkSubItems } from "@/services/subItemValidator";
import TotalsDisplay from "./TotalsDisplay";

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
  //"incomplete", "unequal", or "complete"
  const [breakdownStatus, setBreakdownStatus] = useState("complete");
  const [subItems, setSubItems] = useState<SubExpense[]>([{ name: "", cost: 0, quantity: 1 }]);
  
  const addSubItem = () => {
    setSubItems([...subItems, {name: '', cost: 0, quantity: 0} ]);
  };

  const updateItem = (index: number, key: string, newValue: any) => {
    setSubItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [key]: newValue } : item
      )
    );    
  };

  const removeItem = (index: number) => {
    setSubItems((prevItems) => 
    prevItems.splice(index, 1));
  }
  const ExpenseValidationSchema = Yup.object().shape({
    expenseName: Yup.string().required("Required"),
    totalCost: Yup.number().required().positive(),
    expenseDate: Yup.date().required(),
    costBreakdown: Yup.boolean(),
  });

  var initialValues = {
    expenseName: "",
    totalCost: 0.0,
    expenseDate: new Date(),
    costBreakdown: false,
    subExpenses: [],
  }

  const onSubmit = async (values: MyFormValues, { resetForm }: any) => {
    var status = checkSubItems(values.subExpenses, values.totalCost);
    setBreakdownStatus(status);
    if (values.costBreakdown && status !== "complete") {
      console.log('in here container');
      return;
    }

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

                {values.costBreakdown && (
                  <>
                  <TotalsDisplay totalCost={values.totalCost} subItems={subItems} />
                  {breakdownStatus === "incomplete" && 
                  <TextError children="Sub Items table is incomplete. Please fill out before saving." />}
                    <FormikControl
                      subItems={subItems}
                      onChange={(index: number, property: string, val: any) => {
                        updateItem(index, property, val);
                      }
                      }
                      onAdd={addSubItem}
                      onRemove={removeItem}
                      control="array"
                      label="List of Sub Expenses: "
                      name="subExpenses"
                    />
                  </>
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
      <DismissableAlert
        showAlert={isCreated}
        title="Expense was created"
        onDismiss={() => setIsCreated(false)}
      />
      <DismissableAlert
        showAlert={isFailure}
        title="Expense not created"
        onDismiss={() => setIsFailure(false)}
      />
    </>
  );
}
function useDeepCompareEffect(arg0: () => void, arg1: any[]) {
  throw new Error("Function not implemented.");
}


import { Field, FieldArray } from "formik";
import React from "react";
import { SubExpense } from "./FormikContainer";

function FieldList(props: any) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FieldArray name={name}>
        {(fieldArrayProps) => {
          // console.log('fieldProps', fieldArrayProps); //fieldArrayProps knows subExpenseNames because it is defined as name= in FieldArray component
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const { subExpenses } = values;

          return (
            <div>
              {subExpenses.map((subExpense: SubExpense, index: number) => (
                <div key={index}>
                  <label>Item Name: </label>
                  <Field name={`subExpenses[${index}].name`} />
                  <label>Item Cost: </label>
                  <Field name={`subExpenses[${index}].cost`} />
                  <label>Item Quantity: </label>
                  <Field name={`subExpenses[${index}].quantity`} />

                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      {" "}
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => push({ name: "", cost: 0, quantity: 1 })}
              >
                Add Sub Expense
              </button>
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
}

export default FieldList;

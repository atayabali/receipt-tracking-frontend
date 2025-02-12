import { styles } from "@/assets/globalStyles";
import { ErrorMessage, Field } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextError from "./TextError";

export default function DatePickerInput(props: any) {
  const { label, name, ...rest } = props;
  return (
    <div style={styles.formControl}>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DatePicker
              selected={value}
              onChange={(date) =>
                setFieldValue(
                  name,
                  date?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                )
              }
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

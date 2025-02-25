import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import { FieldArray } from "formik";
import React from "react";
import { Button, TextInput } from "react-native";
import { SubExpense } from "./FormikContainer";
import GreenOutlineBtn from "../GreenOutlineBtn";

function FieldList(props: any) {
  const { label, name, onChange } = props;
  return (
    <View style={{ backgroundColor: "rgb(188, 189, 203)" }}>
      <Text>{label}</Text>
      <FieldArray name={name}>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const { subExpenses } = values;
          return (
            <>
              <View style={styles.header}>
                <Text style={styles.columnName}>Item Name: </Text>
                <Text style={styles.columnName}>Item Cost: </Text>
                <Text style={styles.columnName}>Item Quantity: </Text>
              </View>
              {subExpenses.map((subExpense: SubExpense, index: number) => (
                <View key={index} style={styles.row}>
                  <TextInput
                    value={subExpense.name}
                    onChangeText={(val: any) =>
                      onChange(`subExpenses[${index}].name`, val)
                    }
                    style={styles.inputCell}
                  />
                  <TextInput
                    value={subExpense.cost.toString()}
                    onChangeText={(val: any) =>
                      onChange(`subExpenses[${index}].cost`, val)
                    }
                    style={styles.inputCell}
                  />
                  <TextInput
                    value={subExpense.quantity.toString()}
                    onChangeText={(val: any) =>
                      onChange(`subExpenses[${index}].quantity`, val)
                    }
                    style={styles.inputCell}
                  />

                  {index == 0 && (
                    <View
                      style={{
                        width: 75,
                        backgroundColor: "rgb(188, 189, 203)",
                      }}
                    />
                  )}
                  {index > 0 && (
                    // <GreenOutlineBtn handleClick={() => remove(index)} buttonText="Remove" />
                    <Button title="Remove" onPress={() => remove(index)} />
                  )}
                </View>
              ))}
              <GreenOutlineBtn handleClick={() => push({ name: "", cost: 0, quantity: 1 })} buttonText="Add Sub Expense" />
            </>
          );
        }}
      </FieldArray>
    </View>
  );
}

export default FieldList;

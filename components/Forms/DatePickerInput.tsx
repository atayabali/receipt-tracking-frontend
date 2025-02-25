import { styles } from "@/assets/globalStyles";
import { Text, View } from "@/components/Themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import GreenOutlineBtn from "../GreenOutlineBtn";

export default function DatePickerInput(props: any) {
  const { label, name, value, onChange, errors, touched } = props;
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={{display: "flex", alignItems: "center", backgroundColor: 'rgb(188, 189, 203)' }}>
      <Text>
        {label} {value.toDateString()}
      </Text>
      {Platform.OS === "web" ? (
        <>
          <GreenOutlineBtn
            buttonText="Change Date"
            handleClick={() => setShowPicker(true)}
          />
          <DatePickerModal
            locale="en"
            mode="single"
            visible={showPicker}
            onDismiss={() => setShowPicker(false)}
            date={value}
            onConfirm={(params) => {
              setShowPicker(false);
              onChange(params.date);
            }}
          />
        </>
      ) : (
        <>
          <DateTimePicker
            value={value}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        </>
      )}

      {touched[name] && errors[name] && (
        <Text style={styles.error}>{errors[name]}</Text>
      )}
    </View>
  );
}

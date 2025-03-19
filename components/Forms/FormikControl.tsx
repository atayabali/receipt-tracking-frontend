import React from "react";
import Input from "./Input";
import DatePicker from "./DatePickerInput";
import Checkbox from "./Checkbox";

export default function FormikControl(props: any) {
    const {control, ...rest } = props;
    switch(control){
        case 'input': return <Input {...rest}/>
        case 'checkbox': return <Checkbox {...rest} />
        case 'date': return <DatePicker {...rest} />
        default: return null;
    }
}

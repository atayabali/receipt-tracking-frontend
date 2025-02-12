import React from "react";
import Input from "./Input";
// import DatePicker from "./DatePickerInput";
// import Checkbox from "./Checkbox";
// import FieldList from "./FieldList";

export default function FormikControl(props: any) {
    const {control, ...rest } = props;
    switch(control){
        case 'input': return <Input {...rest}/>
        // case 'checkbox': return <Checkbox {...rest} />
        // case 'date': return <DatePicker {...rest} />
        // case 'array': return <FieldList {...rest} />
        default: return null;
    }
}

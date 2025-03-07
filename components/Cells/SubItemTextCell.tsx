import { styles } from '@/assets/globalStyles';
import React from 'react'
import { TextInput } from 'react-native';

const convertIndexToProperty = (cellIndex: number) => {
    switch (cellIndex) {
      case 0:
        return "name";
      case 1:
        return "cost";
      case 2:
        return "quantity";
      default:
        return "id";
    }
  };

export const SubItemTextCell = (props : any) => {
    var propertyName = convertIndexToProperty(props.propertyIndex);

    return (
      <TextInput
        value={props.cellValue}
        onChangeText={(val: any) => {
          props.updateCell(val, propertyName);
        }}
        style={styles.cellText}
      />
    );
}

export default SubItemTextCell
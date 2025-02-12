import { styles } from '@/assets/globalStyles';
import { ErrorMessage, Field } from 'formik';
import React from 'react';
import TextError from './TextError';
import { View, Text } from "@/components/Themed";
import { TextInput } from 'react-native';


export default function Input(props: any){
    const { label, name, onChange, errors, touched } = props;
    return (
        <View className='form-control' style={styles.formControl}>
            <Text>{label}</Text>
            <TextInput value={name} onChangeText={onChange} style={styles.input}/>
              {touched[name] && errors[name] && <Text style={styles.error}>{errors[name]}</Text> }
        </View>
    )
}
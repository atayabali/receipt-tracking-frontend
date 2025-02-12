import { styles } from '@/assets/globalStyles'
import React from 'react'
import { View, Text } from "@/components/Themed";

export default function TextError(props: any) {
  return (
    <Text className='error' style={styles.error}>
        {props.children}
    </Text>
  )
}

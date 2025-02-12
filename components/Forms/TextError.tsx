import { styles } from '@/assets/globalStyles'
import React from 'react'

export default function TextError(props: any) {
  return (
    <div className='error' style={styles.error}>
        {props.children}
    </div>
  )
}

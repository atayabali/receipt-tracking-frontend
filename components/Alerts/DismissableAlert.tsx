import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'

export default function DismissableAlert(props: any) {
  return (
    <AwesomeAlert
        show={props.showAlert}
        showProgress={false}
        title={props.title}
        closeOnTouchOutside={true}
        onDismiss={() => props.onDismiss()}
      />
  )
}
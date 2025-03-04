import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts';

export const ConfirmCancelAlert = (props: any) => {
  return (
    <AwesomeAlert
    show={props.show}
    showProgress={false}
    title={props.title}
    message={props.message}
    closeOnTouchOutside={false}
    closeOnHardwareBackPress={false}
    showCancelButton={true}
    showConfirmButton={true}
    cancelText="No, Cancel"
    confirmText="Confirm"
    confirmButtonColor="#DD6B55"
    onDismiss={() => props.dismissAlert()}
    onCancelPressed={() => props.dismissAlert()}
    onConfirmPressed={() => {
      props.dismissAlert();
      props.confirmPressed();

    }}
  />
  )
}

export default ConfirmCancelAlert
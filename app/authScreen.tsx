import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from '@/assets/globalStyles';
import GreenOutlineBtn from '@/components/GreenOutlineBtn';
import Title from '@/components/Title';
import { Guid } from 'typescript-guid';
import axios from 'axios';
import { urlPrefix } from '@/services/configureUrl';
import { storeRefreshToken, storeToken } from '@/services/authService';
import { useAuth } from '@/services/authContext';


const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .when('password', {
      is: (val) => val && val.length > 0,
      then: (schema) => schema.required('Required'),
    }),
});

export default function AuthScreen(props:any) {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const {signup, login} = useAuth();

 
  return (
    <View style={styles.container}>
      <Title title={isSignUp ? 'Sign Up' : 'Login'}></Title>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        
      </Text>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={isSignUp ? validationSchema : validationSchema.omit(['confirmPassword'])}
        onSubmit={(values) => {
          console.log(values);
          if(isSignUp){
            signup(values.email, values.password);
          } else {
            login(values.email, values.password);
          }
          props.setIsAuthenticated(true);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
            />
            {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
              // style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

            {isSignUp && (
              <>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  style={styles.input}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                )}
              </>
            )}

            <GreenOutlineBtn buttonText={isSignUp ? 'Sign Up' : 'Login'} handleClick={handleSubmit} />
          </View>
        )}
      </Formik>

      <Text
        style={{ marginTop: 20, marginBottom: 15, color: 'blue', alignSelf: 'center' }}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </Text>
      <Text
        style={{ marginTop: 20, color: 'blue', alignSelf: 'center' }}
        onPress={() => props.setIsAuthenticated(true)}
      >
        {"Skip authorization for now"}
      </Text>
    </View>
  );
}

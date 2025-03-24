import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface LoadingScreenProps {
  message?: string;
  backgroundColor?: string;
  textColor?: string;
  size?: 'small' | 'large';
}

// A functional Loading component with props and TypeScript support
const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  backgroundColor =  "rgb(188, 189, 203)", //'#f0f0f0',  // Default light background color
  textColor = "rgb(6, 68, 32)",  // Default text color
  size = 'large', // Default size of the spinner
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size={size} color={textColor} />
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
  } as TextStyle,
});

export default LoadingScreen;

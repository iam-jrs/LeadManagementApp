import React from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { createMMKV } from 'react-native-mmkv';



const RootNavContent = () => {
  const { isAuthenticated } = useAuth();
  const storage =  createMMKV();
  const isRemember = storage.getBoolean('rememberMe');

  return (
    <NavigationContainer>
      {isAuthenticated || isRemember? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const RootNavigator = () => (
  <AuthProvider>
    <RootNavContent />
  </AuthProvider>
);

export default RootNavigator;

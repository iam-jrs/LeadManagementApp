import React from 'react';
import { AuthProvider, useAuth } from '../store/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';



const RootNavContent = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const RootNavigator = () => (
  <AuthProvider>
    <RootNavContent />
  </AuthProvider>
);

export default RootNavigator;

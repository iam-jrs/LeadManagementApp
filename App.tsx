import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
    
      <Toast />
      <RootNavigator />
    </>
  );
};

export default App;

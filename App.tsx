import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Toast />
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

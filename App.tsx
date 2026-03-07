import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Toast />
      <RootNavigator />
    </Provider>
  );
};

export default App;

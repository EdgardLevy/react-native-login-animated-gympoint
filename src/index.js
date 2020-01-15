import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/integration/react';

// import { Container } from './styles';
import './config/ReactotronConfig';
import App from './App';
import {persistor, store} from './store';

export default function Index() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <App />
        </PersistGate>
      </Provider>
    </>
  );
}

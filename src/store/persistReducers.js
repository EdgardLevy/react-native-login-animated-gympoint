import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default reducers => {
  const persitedReducer = persistReducer(
    {
      key: 'rnanimated',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );
  return persitedReducer;
};

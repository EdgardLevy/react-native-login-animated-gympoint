import {Alert} from 'react-native';

import {takeLatest, call, put, all, delay} from 'redux-saga/effects';

import api from '~/services/api';

import {signInSucess, signFailure} from './actions';

export function* singIn({payload}) {
  try {
    const {email, password} = payload;
    // const response = yield call(api.get, `students/${userId}`);
    // const {name, email} = response.data;
    const name = email.split('@')[0];
    const user = {id: 1, email, name};
    // simulando chamada na api
    if (password === '0') {
      yield delay(1000);
      throw new Error('invalid password');
    } else {
      yield delay(2000);
    }
    yield put(signInSucess(user));
  } catch (error) {
    Alert.alert(
      'Erro no login',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', singIn)]);

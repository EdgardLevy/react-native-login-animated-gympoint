import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {signOut} from '~/store/modules/auth/actions';

import {Container} from './styles';

export default function SignOut() {
  const dispatch = useDispatch();
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          dispatch(signOut());
        }}>
        <Icon name="exit-to-app" size={25} color="#ee4d64" />
      </TouchableOpacity>
    </Container>
  );
}

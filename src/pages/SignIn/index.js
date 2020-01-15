import React, {useRef, useState, useEffect, useCallback} from 'react';
import {Image, Animated, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import {signInRequest} from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

const animating = false;

export default function SignIn({navigation}) {
  const [opacity] = useState(new Animated.Value(0));
  const [translateY] = useState(
    new Animated.Value(Dimensions.get('window').height),
  );
  const [logoY] = useState(
    new Animated.Value((Dimensions.get('window').height / 2) * -1),
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        duration: 900,
        bounciness: 15,
      }),
      Animated.spring(logoY, {
        toValue: 0,
        duration: 900,
        bounciness: 10,
      }),
    ]).start();
  }, [logoY, opacity, translateY]);

  const passwordRef = useRef();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }
  return (
    <Background>
      <Container>
        <Animated.Image
          source={logo}
          style={{
            transform: [
              {
                translateY: logoY,
              },
            ],
          }}
        />
        <Animated.View
          style={{
            alignSelf: 'stretch',
            opacity,
            transform: [
              {
                translateY,
              },
            ],
          }}>
          <Form>
            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />
            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Sua senha secreta"
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setPassword}
            />
            <SubmitButton loading={loading} onPress={handleSubmit}>
              Acessar
            </SubmitButton>
          </Form>
          <SignLink onPress={() => navigation.navigate('SignUp')}>
            <SignLinkText>Criar conta gratuita</SignLinkText>
          </SignLink>
        </Animated.View>
      </Container>
    </Background>
  );
}

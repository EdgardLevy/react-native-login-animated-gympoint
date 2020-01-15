import React, {useRef, useState, useEffect} from 'react';
import {Image, Animated, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import {signUpRequest} from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({navigation}) {
  const [opacity] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(1));
  const [translateY] = useState(
    new Animated.Value(Dimensions.get('window').height),
  );
  const [logoY] = useState(
    new Animated.Value((Dimensions.get('window').height / 2) * -1),
  );
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.auth.loading);

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

  useEffect(() => {
    if (loading) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
      }).start();
    }
  }, [fadeAnim, loading]);

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
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
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome completo"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />
            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              ref={emailRef}
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
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setPassword}
            />
            <SubmitButton loading={loading} onPress={handleSubmit}>
              Criar conta
            </SubmitButton>
          </Form>
          <SignLink onPress={() => navigation.navigate('SignIn')}>
            <SignLinkText>Já tenho conta</SignLinkText>
          </SignLink>
        </Animated.View>
      </Container>
    </Background>
  );
}

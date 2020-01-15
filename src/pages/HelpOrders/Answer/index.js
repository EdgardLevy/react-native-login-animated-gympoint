import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import {
  Background,
  Container,
  Header,
  Title,
  Time,
  Question,
  Answer,
} from './styles';

export default function HelpOrderAnswer({navigation}) {
  const helpOrder = navigation.getParam('helpOrder');
  return (
    <Background>
      <Container>
        <Header>
          <Title>QUESTION</Title>
          <Time>{helpOrder.dateFormatted}</Time>
        </Header>
        <Question>{helpOrder.question}</Question>
        <Title>ANSWER</Title>
        <Answer>{helpOrder.answer}</Answer>
      </Container>
    </Background>
  );
}

HelpOrderAnswer.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={25} color="#ee4d64" />
    </TouchableOpacity>
  ),
});

HelpOrderAnswer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

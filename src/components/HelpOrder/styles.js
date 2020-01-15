import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 4px;
  background: #fff;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: space-between;
  flex: 1 auto;
  flex-direction: row;
`;

export const Left = styled.View`
  flex-direction: row;
`;

export const Status = styled.View`
  font-size: 14px;
  align-items: center;
  align-content: center;
  flex-direction: row;
`;

export const StatusIcon = styled(Icon).attrs({
  name: 'check-circle',
  size: 18,
})`
  color: ${props => (props.answer ? '#42cb59' : '#999999')};
`;

export const StatusText = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  color: ${props => (props.answer ? '#42cb59' : '#999999')};
`;

export const Time = styled.Text`
  color: #999;
  font-size: 14px;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  margin-top: 10px;
`;

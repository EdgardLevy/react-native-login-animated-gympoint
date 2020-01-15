import {Animated} from 'react-native';

import styled from 'styled-components/native';

export const Container = styled(Animated.View)`
  padding: 0 15px;
  height: 46px;
  /* background: #eee; */
  border: 1px solid #eee;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
  color: #999999;
`;

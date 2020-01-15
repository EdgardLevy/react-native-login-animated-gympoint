import {Animated} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

const rctBtn = Animated.createAnimatedComponent(RectButton);
export const Container = styled(rctBtn)`
  height: 46px;
  background: #ee4d64;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
  flex: 1 auto;
  background: #eee;
`;

export const Container = styled.View`
  background: #fff;
  padding: 20px;
  margin: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
export const Time = styled.Text`
  color: #999;
  font-size: 14px;
`;
export const Question = styled.Text`
  font-size: 16px;
  line-height: 28px;
  margin-bottom: 15px;
  color: #999;
`;
export const Answer = styled.Text`
  margin-top: 15px;
  font-size: 16px;
  line-height: 28px;
  color: #999;
`;

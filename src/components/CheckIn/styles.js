import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 14px;
`;

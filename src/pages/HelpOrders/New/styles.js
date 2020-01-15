import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1 auto;
  background: #eee;
  padding: 20px;
`;

export const Answer = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
  textAlignVertical: 'top',
  multiline: true,
})`
  height: 300px;
  background: #fff;
  margin-bottom: 25px;
  border-radius: 4px;
  font-size: 16px;
  padding: 20px 15px;
`;

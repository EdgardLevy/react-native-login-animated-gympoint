import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #eee;
  padding: 20px !important;
  align-items: center;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 25px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999',
})`
  margin: 30px 0;
`;

import React, {useEffect, useState} from 'react';
import {withNavigationFocus} from 'react-navigation';
import {useSelector} from 'react-redux';

import {parseISO, formatRelative} from 'date-fns';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Button from '~/components/Button';
import HelpOrder from '~/components/HelpOrder';
import api from '~/services/api';

import {Container, List, Loading} from './styles';

function HelpOrderList({navigation, isFocused}) {
  const student = useSelector(state => state.student.profile);

  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadHelpOrders() {
    setLoading(true);
    const response = await api.get(`students/${student.id}/help-orders`);
    const {data} = response;
    setHelpOrders(
      data.records.map(item => {
        return {
          ...item,
          dateFormatted: formatRelative(parseISO(item.created_at), new Date(), {
            addSuffix: true,
          }),
        };
      })
    );
    setHasNext(data.meta.has_next);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) loadHelpOrders();
  }, [student, isFocused]);// eslint-disable-line

  async function handleAdd() {
    navigation.navigate('NewHelpOrder', {
      student_id: student.id,
    });
  }

  function handleItemClick(helpOrder) {
    navigation.navigate('HelpOrderAnswer', {
      helpOrder,
    });
  }

  async function loadMore() {
    if (!hasNext) return;
    const pageNumber = page + 1;

    setLoading(true);
    const response = await api.get(
      `students/${student.id}/help-orders?page=${pageNumber}`
    );
    const {data} = response;

    setHelpOrders([
      ...helpOrders,
      ...data.records.map(item => {
        return {
          ...item,
          dateFormatted: formatRelative(parseISO(item.created_at), new Date(), {
            addSuffix: true,
          }),
        };
      }),
    ]);
    setHasNext(data.meta.has_next);
    setPage(pageNumber);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);
    setPage(1);
    await loadHelpOrders();
    setRefreshing(false);
  }

  return (
    <Background>
      <Container>
        <Button loading={loading} onPress={handleAdd}>
          New request for assistance
        </Button>
        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading />}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMore()}
          renderItem={({item}) => (
            <HelpOrder data={item} onPress={() => handleItemClick(item)} />
          )}
        />
      </Container>
    </Background>
  );
}

HelpOrderList.propTypes = {
  isFocused: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

HelpOrderList.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(HelpOrderList);

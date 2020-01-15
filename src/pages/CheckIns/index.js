import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {useSelector} from 'react-redux';

import {parseISO, formatRelative} from 'date-fns';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Button from '~/components/Button';
import CheckIn from '~/components/CheckIn';
import api from '~/services/api';

import {Container, List, Loading} from './styles';

function CheckIns({isFocused}) {
  // const student = useSelector(state => state.student.profile);

  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [lastIndex, setLastIndex] = useState(0);

  async function loadCheckIns() {
    setLoading(true);
    const response = await api.get(`students/${student.id}/checkins`);
    const {data} = response;
    let idx_position = data.meta.total_records;

    const _checkIns = data.records.map((item, index) => {
      if (index > 0) idx_position -= 1;
      return {
        ...item,
        index: idx_position,
        dateFormatted: formatRelative(parseISO(item.created_at), new Date(), {
          addSuffix: true,
        }),
      };
    });
    setLastIndex(idx_position);
    setCheckIns(_checkIns);
    setHasNext(data.meta.has_next);
    setLoading(false);
  }

  // useEffect(() => {
  //   loadCheckIns();
  // }, [student, isFocused]);// eslint-disable-line

  function handleAdd() {
    Alert.alert(
      'New Check-In',
      'Confirm?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              setLoading(true);
              await api.post(`students/${student.id}/checkins`);
              await loadCheckIns();
              setLoading(false);
              Alert.alert('Check-In Successfully');
            } catch (error) {
              setLoading(false);
              Alert.alert(error.response.data.error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  }

  async function loadMore() {
    if (!hasNext) return;
    const pageNumber = page + 1;

    setLoading(true);
    const response = await api.get(
      `students/${student.id}/checkins?page=${pageNumber}`,
    );
    const {data} = response;

    let idx_position = lastIndex;

    const _checkIns = data.records.map(item => {
      idx_position -= 1;
      return {
        ...item,
        index: idx_position,
        dateFormatted: formatRelative(parseISO(item.created_at), new Date(), {
          addSuffix: true,
        }),
      };
    });
    setLastIndex(idx_position);
    setCheckIns([...checkIns, ..._checkIns]);
    setHasNext(data.meta.has_next);
    setPage(pageNumber);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);
    setPage(1);
    await loadCheckIns();
    setRefreshing(false);
  }

  return (
    <Background>
      <Container>
        <Button loading={loading} onPress={handleAdd}>
          New Check-in
        </Button>
        <List
          data={checkIns}
          keyExtractor={item => String(item.id)}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading />}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMore()}
          renderItem={({item}) => <CheckIn data={item} />}
        />
      </Container>
    </Background>
  );
}

CheckIns.propTypes = {
  isFocused: PropTypes.bool,
};

CheckIns.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(CheckIns);

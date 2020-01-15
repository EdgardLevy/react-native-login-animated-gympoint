import React from 'react';

import PropTypes from 'prop-types';

import {Container, Title, Time} from './styles';

export default function CheckIn({data}) {
  return (
    <Container>
      <Title>Check In #{data.index}</Title>
      <Time>{data.dateFormatted}</Time>
    </Container>
  );
}

CheckIn.propTypes = {
  data: PropTypes.shape({
    index: PropTypes.number,
    dateFormatted: PropTypes.string,
  }).isRequired,
};

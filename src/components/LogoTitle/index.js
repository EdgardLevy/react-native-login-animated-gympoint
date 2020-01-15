import React from 'react';

import logo from '~/assets/logo_header.png';

import {Container, Logo, Title} from './styles';

export default function LogoTitle() {
  return (
    <Container>
      <Logo source={logo} />
      <Title>GYMPOINT</Title>
    </Container>
  );
}

import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Animated} from 'react-native';

import PropTypes from 'prop-types';

import {Container, Text} from './styles';

export default function Button({children, loading, ...rest}) {
  const [borderRadius] = useState(new Animated.Value(4));
  const [defaultSize, setDefaultSize] = useState(0);
  const [bWidth] = useState(new Animated.Value(354));
  useEffect(() => {
    if (loading) {
      Animated.parallel([
        Animated.timing(borderRadius, {
          toValue: 23,
          duration: 200,
        }),
        Animated.timing(bWidth, {
          toValue: 50,
          duration: 200,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(borderRadius, {
          toValue: 4,
          duration: 800,
        }),
        Animated.timing(bWidth, {
          toValue: defaultSize,
          duration: 800,
        }),
      ]).start();
    }
  }, [bWidth, borderRadius, defaultSize, loading]);

  console.tron.log('bWidth', bWidth);

  function measureView(event) {
    console.tron.log('event peroperties: ', event);
    if (defaultSize === 0) setDefaultSize(event.nativeEvent.layout.width);
  }

  return (
    <Container
      {...rest}
      style={{
        borderRadius,
        width: bWidth,
      }}
      onLayout={event => measureView(event)}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};

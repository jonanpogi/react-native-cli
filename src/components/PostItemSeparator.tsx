import React, { Component, memo } from 'react';
import { StyleSheet, View } from 'react-native';

class PostItemSeparator extends Component {
  render = () => {
    return <View style={styles.container} />;
  };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 2,
    marginVertical: 5,
  },
});

export default memo(PostItemSeparator);

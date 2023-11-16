import React, { Component, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class PostItemEmptyPlaceholder extends Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Post Found.</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '900',
    fontSize: 18,
  },
});

export default memo(PostItemEmptyPlaceholder);

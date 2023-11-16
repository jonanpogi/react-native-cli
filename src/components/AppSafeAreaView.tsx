import React, { Component, memo } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

type AppSafeAreaViewProps = {
  children: React.ReactNode;
};

class AppSafeAreaView extends Component<AppSafeAreaViewProps> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.props.children}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default memo(AppSafeAreaView);

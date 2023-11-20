import React, { Component, memo } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

type AppSafeAreaViewProps = {
  children: React.ReactNode;
} & SafeAreaViewProps;

class AppSafeAreaView extends Component<AppSafeAreaViewProps> {
  render() {
    const { ...otherProps } = this.props;

    return (
      <SafeAreaView {...otherProps} style={styles.container}>
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

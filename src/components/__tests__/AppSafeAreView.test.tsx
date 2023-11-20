import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AppSafeAreaView from '../AppSafeAreaView';
import { View } from 'react-native';

describe('AppSafeAreaView', () => {
  test('Should renders correctly', () => {
    const { getByTestId } = render(
      <AppSafeAreaView>
        <View />
      </AppSafeAreaView>,
    );

    waitFor(() => {
      const container = getByTestId('app-safe-area-view');
      expect(container).toBeDefined();
    });
  });
});

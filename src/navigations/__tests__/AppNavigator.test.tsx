import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AppNavigator from '../AppNavigator';
import { View } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import DetailScreen from '../../screens/DetailScreen';

jest.mock('../../screens/HomeScreen', () => jest.fn());
jest.mock('../../screens/DetailScreen', () => jest.fn());

describe('AppNavigator', () => {
  test('Should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );

    const wrapper = render(<AppNavigator />);

    await waitFor(() => {
      wrapper.getByTestId('mock-home-screen');
    });
  });

  test('Should render Detail Screen when routed', async () => {
    (HomeScreen as jest.Mock).mockImplementationOnce(() => {
      const navigation = useNavigation();

      useEffect(() => {
        navigation.navigate('DetailScreen' as never);
      }, [navigation]);

      return null;
    });

    (DetailScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-detail-screen" />,
    );

    const wrapper = render(<AppNavigator />);

    await waitFor(() => {
      wrapper.getByTestId('mock-detail-screen');
    });
  });
});

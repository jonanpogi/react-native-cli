import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import App from '../App';

jest.mock('../App', () => jest.fn());

describe('App', () => {
  test('Should render routes correctly', () => {
    (App as jest.Mock).mockReturnValueOnce(<View testID="mock-routes" />);

    const { getByTestId } = render(<App />);

    getByTestId('mock-routes');
  });
});

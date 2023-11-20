import React from 'react';
import { render } from '@testing-library/react-native';
import PostItemSeparator from '../PostItemSeparator';

describe('PostItemSeparator', () => {
  test('Should render correctly', () => {
    const { getByTestId } = render(<PostItemSeparator />);

    expect(getByTestId('item-separator')).toBeDefined();
  });
});

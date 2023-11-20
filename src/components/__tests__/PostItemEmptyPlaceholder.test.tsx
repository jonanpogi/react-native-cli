import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PostItemEmptyPlaceholder from '../PostItemEmptyPlaceholder';

describe('PostItemEmptyPlaceholder', () => {
  test('Should renders correctly', () => {
    const { getByText } = render(<PostItemEmptyPlaceholder />);

    waitFor(() => {
      const container = getByText('No Post Found.');
      expect(container).toBeDefined();
    });
  });
});

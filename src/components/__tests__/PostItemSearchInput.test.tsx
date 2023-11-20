import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import PostItemSearchInput from '../PostItemSearchInput';

const mockHandleSearch = jest.fn();

describe('PostItemSearchInput', () => {
  test('Should renders correctly', () => {
    const { getByTestId } = render(
      <PostItemSearchInput searchText={''} handleSearch={mockHandleSearch} />,
    );

    waitFor(() => {
      const text = getByTestId('search-input');

      expect(text).toBeDefined();
    });
  });

  test('Should call handleSearch function when user type something', () => {
    const { getByTestId } = render(
      <PostItemSearchInput searchText={''} handleSearch={mockHandleSearch} />,
    );

    waitFor(() => {
      const handleSearch = getByTestId('search-input');

      fireEvent.changeText(handleSearch, 'test');

      expect(handleSearch).toHaveBeenCalled();
    });
  });
});

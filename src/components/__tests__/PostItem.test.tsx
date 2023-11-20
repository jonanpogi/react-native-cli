import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import PostItem from '../PostItem';

const mockGoToDetail = jest.fn();

const mockPostItem = {
  post: 'post',
  title: 'title',
  author: 'author',
  url: 'url',
  created_at: 'created_at',
  _tags: ['tags'],
  goToDetail: mockGoToDetail,
};

describe('PostItem', () => {
  test('Should renders correctly', () => {
    const { getByText } = render(<PostItem {...mockPostItem} />);

    waitFor(() => {
      const text1 = getByText('Title: title');
      const text2 = getByText('Author: author');
      const text3 = getByText('URL: url');
      const text4 = getByText('Created At: created_at');
      const text5 = getByText('Tags: tags');

      expect(text1).toBeDefined();
      expect(text2).toBeDefined();
      expect(text3).toBeDefined();
      expect(text4).toBeDefined();
      expect(text5).toBeDefined();
    });
  });

  test("Should call 'goToDetail' function when press button", () => {
    const { getByTestId } = render(<PostItem {...mockPostItem} />);

    waitFor(() => {
      const button = getByTestId('touchable-opacity');

      fireEvent.press(button);

      expect(mockGoToDetail).toHaveBeenCalled();
    });
  });
});

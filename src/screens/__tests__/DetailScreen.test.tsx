import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DetailScreen from '../DetailScreen';

const mockPosts = [
  { id: 1, title: 'Post 1', author: 'Author 1' },
  { id: 2, title: 'Post 2', author: 'Author 2' },
];

const routeMock = {
  params: {
    post: JSON.stringify(mockPosts[0]),
  },
} as any;

const goBackMock = jest.fn();

const navigationMock = {
  navigate: jest.fn(),
  goBack: goBackMock,
} as any;

describe('DetailScreen', () => {
  test('Should renders correctly', () => {
    const { getByTestId } = render(
      <DetailScreen route={routeMock} navigation={navigationMock} />,
    );

    waitFor(() => {
      const container = getByTestId('detail-screen');
      expect(container).toBeDefined();
    });
  });

  test('goBack function is called when button is pressed', () => {
    const { getByTestId } = render(
      <DetailScreen route={routeMock} navigation={navigationMock} />,
    );

    waitFor(() => {
      const backButton = getByTestId('back-button');

      fireEvent.press(backButton);

      expect(goBackMock).toHaveBeenCalled();
    });
  });
});

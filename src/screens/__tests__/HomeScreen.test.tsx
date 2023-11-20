import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import HomeScreen from '../HomeScreen';

jest.mock('axios');

jest.mock('react-navigation', () => ({
  withNavigation: (Component: any) => (props: any) =>
    <Component navigation={{ navigate: jest.fn() }} {...props} />,
}));

describe('HomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should renders the component correctly', () => {
    const { getByTestId } = render(<HomeScreen />);

    waitFor(() => {
      const flatList = getByTestId('flat-list');
      const activityIndicator = getByTestId('activity-indicator');

      expect(flatList).toBeDefined();
      expect(activityIndicator).toBeDefined();
    });
  });

  test('Should fetches posts on component mount', () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', author: 'Author 1' },
      { id: 2, title: 'Post 2', author: 'Author 2' },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockPosts });

    const { getByText, getByTestId } = render(<HomeScreen />);

    waitFor(() => {
      expect(getByTestId('flat-list')).toBeDefined();
      expect(getByText('Post 1')).toBeDefined();
      expect(getByText('Post 2')).toBeDefined();
    });
  });

  test('Should navigates to detail screen on post item click', () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', author: 'Author 1' },
      { id: 2, title: 'Post 2', author: 'Author 2' },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockPosts });

    const navigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(<HomeScreen />);

    waitFor(() => {
      const post1 = getByText('Post 1');

      fireEvent.press(post1);

      expect(navigation.navigate).toHaveBeenCalledWith('DetailScreen', {
        post: JSON.stringify(mockPosts[0]),
      });
    });
  });

  test('Should searches for posts on search input change', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', author: 'Author 1' },
      { id: 2, title: 'Post 2', author: 'Author 2' },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockPosts });

    const { getByTestId, getByText } = render(<HomeScreen />);

    const searchInput = getByTestId('search-input');

    waitFor(() => {
      fireEvent.changeText(searchInput, 'Post 1');

      expect(getByText('Post 1')).toBeDefined();
      expect(getByText('Post 2')).toBeNull();
    });
  });
});

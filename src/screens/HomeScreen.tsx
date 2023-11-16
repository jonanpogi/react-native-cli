import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet } from 'react-native';
import AppSafeAreaView from '../components/AppSafeAreaView';
import PostItem from '../components/PostItem';
import PostItemEmptyPlaceholder from '../components/PostItemEmptyPlaceholder';
import PostItemSearchInput from '../components/PostItemSearchInput';
import PostItemSeparator from '../components/PostItemSeparator';
import RootStackParamList from '../types/routes';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

type HomeScreenState = {
  posts: any[];
  postsCopy: any[];
  searchText: string;
  page: number;
  loading: boolean;
};

const DEFAULT_PAGE = 0;
const TEN_SECONDS = 1000000;
const FIVE_MILISECONDS = 500;

class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
  cancelToken = axios.CancelToken.source();
  interval: NodeJS.Timeout | undefined;
  pauseInterval: boolean = false;
  searchTimeout: NodeJS.Timeout | undefined;

  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {
      posts: [],
      postsCopy: [],
      searchText: '',
      page: DEFAULT_PAGE,
      loading: false,
    };
  }

  componentDidMount = () => {
    this.fetchPosts();

    this.interval = setInterval(() => {
      this.fetchPosts();
    }, TEN_SECONDS);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);

    if (this.cancelToken) {
      this.cancelToken.cancel();
    }
  };

  fetchPosts = async () => {
    try {
      this.setState(prevState => ({ ...prevState, loading: true }));

      const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.page}`;
      const opt = { cancelToken: this.cancelToken.token };

      const response = await axios.get(url, opt);

      if (response.status > 200) {
        throw new Error('Error on fetching the data.');
      }

      const newPosts = response.data.hits;

      this.setState(prevState => ({
        ...prevState,
        posts: [...prevState.posts, ...newPosts],
        postsCopy: [...prevState.postsCopy, ...newPosts],
        page: prevState.page + 1,
      }));
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Something went wrong', error.message);
      }
    } finally {
      this.setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  goToDetail = (post: string) => {
    this.props.navigation.navigate('DetailScreen', { post });
  };

  // please take note that this search functionality only searches the exact match of the text input
  handleSearch = (text: string) => {
    if (!this.pauseInterval) {
      this.pauseFetchInterval();
    }

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.setState(prevState => ({ ...prevState, searchText: text }));

    if (text.length > 0) {
      this.searchTimeout = setTimeout(() => {
        const post = this.state.posts.find(item => {
          return (
            item.title.toLowerCase() === this.state.searchText.toLowerCase() ||
            item.author.toLowerCase() === this.state.searchText.toLowerCase()
          );
        });

        this.setState(prevState => ({
          ...prevState,
          postsCopy: post ? [post] : [],
        }));
      }, FIVE_MILISECONDS);
    } else {
      this.setState(
        prevState => ({
          ...prevState,
          posts: [],
          postsCopy: [],
          page: 0,
        }),
        () => {
          this.resumeFetchInterval();
        },
      );
    }
  };

  pauseFetchInterval = () => {
    clearInterval(this.interval);
    this.pauseInterval = true;
  };

  resumeFetchInterval = () => {
    this.fetchPosts();

    this.interval = setInterval(() => {
      this.fetchPosts();
    }, TEN_SECONDS);

    this.pauseInterval = false;
  };

  renderItem = ({ item }: { item: any }) => {
    return (
      <PostItem
        post={JSON.stringify(item)}
        title={item.title}
        author={item.author}
        url={item.url}
        created_at={item.created_at}
        _tags={item._tags}
        goToDetail={this.goToDetail}
      />
    );
  };

  itemSeparatorComponent = () => <PostItemSeparator />;

  listHeaderComponent = () => (
    <PostItemSearchInput
      searchText={this.state.searchText}
      handleSearch={this.handleSearch}
    />
  );

  listEmptyComponent = () =>
    !this.state.loading ? <PostItemEmptyPlaceholder /> : null;

  onEndReached = (info: { distanceFromEnd: number }) => {
    if (
      info.distanceFromEnd === 0 &&
      this.state.posts.length >= 20 &&
      this.state.postsCopy.length >= 20
    ) {
      this.fetchPosts();
    }
  };

  render = () => {
    return (
      <AppSafeAreaView>
        <FlatList
          data={this.state.postsCopy}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.flatlistContentContainer}
          ItemSeparatorComponent={this.itemSeparatorComponent}
          ListHeaderComponent={this.listHeaderComponent}
          ListEmptyComponent={this.listEmptyComponent}
          stickyHeaderIndices={[0]}
          onEndReachedThreshold={0}
          onEndReached={this.onEndReached}
        />
        {this.state.loading && <ActivityIndicator size={'large'} />}
      </AppSafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  flatlistContentContainer: {
    padding: 20,
  },
});

export default HomeScreen;

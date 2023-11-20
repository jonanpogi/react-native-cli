import React, { memo, Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text } from 'react-native';

type PostItemProps = {
  post: string;
  title: string;
  author: string;
  url: string;
  created_at: string;
  _tags: string[];
  goToDetail: (post: string) => void;
};

class PostItem extends Component<PostItemProps> {
  constructor(props: PostItemProps) {
    super(props);
  }

  render = () => {
    const { post, title, author, url, created_at, _tags, goToDetail } =
      this.props;

    return (
      <TouchableOpacity
        testID="touchable-opacity"
        onPress={() => goToDetail(post)}
        style={styles.container}>
        <Text>Title: {title}</Text>
        <Text>Author: {author}</Text>
        <Text>URL: {url}</Text>
        <Text>Created At: {created_at}</Text>
        <Text>Tags: {_tags.join(', ')}</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    flex: 1,
    // shadow style for ios and adroid
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
});

export default memo(PostItem);

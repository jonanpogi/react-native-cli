import React, { memo, Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

type PostItemSearchInputProps = {
  searchText: string;
  handleSearch: (text: string) => void;
};

class PostItemSearchInput extends Component<PostItemSearchInputProps> {
  constructor(props: PostItemSearchInputProps) {
    super(props);
  }

  render = () => {
    const { searchText, handleSearch } = this.props;

    return (
      <>
        <TextInput
          style={styles.inputContainer}
          placeholder="Search author and title here..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </>
    );
  };
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 30,
    borderRadius: 15,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1.5,
  },
});

export default memo(PostItemSearchInput);

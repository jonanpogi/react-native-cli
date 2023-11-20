import React, { Component } from 'react';
import { Button, StyleSheet, Text, ScrollView } from 'react-native';
import AppSafeAreaView from '../components/AppSafeAreaView';
import { RouteProp } from '@react-navigation/native';
import RootStackParamList from '../types/routes';
import { StackNavigationProp } from '@react-navigation/stack';

type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'DetailScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailScreen'>;
};

class DetailScreen extends Component<DetailsScreenProps> {
  goBack = () => {
    this.props.navigation.goBack();
  };

  render = () => {
    return (
      <AppSafeAreaView testID="details-screen">
        <ScrollView style={styles.container}>
          <Button title="Go back" onPress={this.goBack} testID="back-button" />
          <Text>{this.props.route.params.post}</Text>
        </ScrollView>
      </AppSafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default DetailScreen;

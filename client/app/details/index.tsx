import { ImageBackground } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Details = () => {
  const { id, uri } = useLocalSearchParams<{ id: string; uri: string }>();
  return <ImageBackground style={styles.container} source={{ uri }} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;

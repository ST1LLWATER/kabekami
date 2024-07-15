import CarouselCards from '@/components/CarouselCards';
import data from '@/constants/Data';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const App = () => {
  const router = useRouter();

  const navigateToDetails = ({ id, uri }) => {
    router.push({
      pathname: '/details',
      params: {
        itemId: id,
        uri,
      },
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>KabeKami</Text>
        <Text style={styles.subtitle}>
          The Godliest Walls You Can Ever Find
        </Text>
      </View>
      <CarouselCards />
      <View style={styles.gridContainer}>
        {data.slice(1).map((item, index) => (
          <View style={styles.gridItem} key={index}>
            <Pressable
              onPress={() =>
                navigateToDetails({ id: 1, uri: item.illustration })
              }
            >
              <ImageBackground
                source={{ uri: item.illustration }}
                style={styles.gridImage}
              >
                {/* <Image
                source={{ uri: item.illustration }}
                style={styles.gridImage}
              /> */}
                <View style={styles.gridTextContainer}>
                  <View>
                    <Text style={styles.gridTitle}>{item.title}</Text>
                    <Text style={styles.gridSubtitle}>{item.subtitle}</Text>
                  </View>
                  <TouchableOpacity style={styles.heartContainer}>
                    <Image
                      source={{
                        uri: 'https://img.icons8.com/?size=100&id=85038&format=png&color=FFFFFF',
                      }}
                      style={styles.heartIcon}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth * 0.6,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ccff',
  },
  subtitle: {
    fontSize: 14,
    color: '#cccccc',
  },
  carouselContainer: {
    marginVertical: 20,
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  carouselTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  gridItem: {
    width: (screenWidth - 40) / 2,
    // height: 'auto',
    height: screenWidth * 0.6,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333',

    shadowColor: '#fff', // Bright white shadow color
    shadowOffset: { width: -2, height: -2 }, // Offset the shadow slightly to the top-left
    shadowOpacity: 0.8, // Adjust opacity for desired intensity
    shadowRadius: 10,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridTextContainer: {
    padding: 5,
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    display: 'flex',
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'white',
  },
  gridTitle: {
    // color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gridSubtitle: {
    color: '#3b3b3b',
    fontSize: 12,
  },
  heartContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
});

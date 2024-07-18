import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import {ParallaxImage} from 'react-native-snap-carousel';

// export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
// export const SLIDER_WIDTH = Dimensions.get('window').width;
// export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const {width: screenWidth} = Dimensions.get('window');

const CarouselCardItem = ({item, index}, parallaxProps) => {
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{uri: item.illustration}}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      <Text style={styles.carouselTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth * 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
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
});

export default CarouselCardItem;

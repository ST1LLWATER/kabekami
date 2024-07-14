import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from 'react-native';

const ENTRIES1 = [
  {
    title: 'Wall of the Day',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration:
      'https://instagram.fgau1-1.fna.fbcdn.net/v/t51.29350-15/450820696_841500970882632_8352903661499114559_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xODkyeDQwOTYuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fgau1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=6h1GkZVhHCsQ7kNvgHe7GdW&edm=AA3DLpEBAAAA&ccb=7-5&ig_cache_key=MzQxMTMxNDI3MTYyMjc0NjU4MA%3D%3D.2-ccb7-5&oh=00_AYCVReCOIVBbfOVhrTifvf7401qocn1MOH0SdBFwaxZEsQ&oe=6698909C&_nc_sid=d92198',
  },
  {
    title: 'Lucent Lines',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Wilderness',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'Rainbow',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'Sunset',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];

const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
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

  return (
    <Carousel
      ref={carouselRef}
      sliderWidth={screenWidth}
      sliderHeight={screenWidth * 0.6}
      itemWidth={screenWidth - 60}
      data={entries}
      renderItem={renderItem}
      hasParallaxImages={true}
    />
  );
};

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source="https://marketing.dcassetcdn.com/blog/2018/October/40-text-logos/Line.jpg"
          style={styles.logo}
        />
        <Text style={styles.appTitle}>Backdrops</Text>
        <Text style={styles.subtitle}>Your new favorite wallpaper app.</Text>
      </View>
      <MyCarousel />
      <View style={styles.gridContainer}>
        {ENTRIES1.slice(1).map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <Image
              source={{ uri: item.illustration }}
              style={styles.gridImage}
            />
            <Text style={styles.gridTitle}>{item.title}</Text>
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
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
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
  item: {
    width: screenWidth - 60,
    height: screenWidth * 0.6,
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
    paddingHorizontal: 10,
  },
  gridItem: {
    width: (screenWidth - 40) / 2,
    height: (screenWidth - 40) / 2,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
});

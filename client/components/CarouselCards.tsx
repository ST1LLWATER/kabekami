import React from 'react';
import {Dimensions, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem from './CarouselCardItem';
import data from '../constants/Data';

const CarouselCards = () => {
  const {width: screenWidth} = Dimensions.get('window');
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  // const goForward = () => {
  //   carouselRef.current.snapToNext();
  // };

  return (
    <View>
      <Carousel
        ref={isCarousel}
        layoutCardOffset={0}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth * 1}
        itemWidth={screenWidth - 130}
        data={data}
        renderItem={CarouselCardItem}
        activeSlideAlignment="center"
        hasParallaxImages={true}
        onSnapToItem={index => setIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

export default CarouselCards;

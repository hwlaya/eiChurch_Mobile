import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Divider, Calendar } from '@ui-kitten/components';
import Carousel from 'react-native-snap-carousel';
import BibleVerseOfTheDay from '../components/BibleVerseOfTheDay';

const HomeScreen = () => {
  const navigation = useNavigation();

  const carouselImages = [
    { id: 1, source: require('../assets/images/carousel1.jpg') },
    { id: 2, source: require('../assets/images/carousel2.jpg') },
    { id: 3, source: require('../assets/images/carousel3.jpg') },
  ];

  const width = Dimensions.get('window').width;

  const handleCarouselPress = () => {
    // Redirect to the CurrentEvents page
    navigation.navigate('CurrentEvents');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header and Logo */}
      <View style={styles.headerContainer}>
        <Text>Header</Text>
        {/* Add your logo component here */}
      </View>

      {/* Carousel Section */}
      <View style={styles.carouselContainer}>
        <Carousel
          layout={'default'}
          data={carouselImages}
          sliderWidth={width}
          itemWidth={width}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleCarouselPress}>
              <View style={styles.carouselItem}>
                <Image key={item.id} source={item.source} style={styles.carouselImage} />
              </View>
            </TouchableOpacity>
          )}
          autoplay
          autoplayInterval={3000}
          loop
        />
      </View>

      {/* Cards */}
      <View style={styles.cardsContainer}>

      {/* Card 1: Bible Verse of the Day */}
      <Card style={styles.card}>
        <BibleVerseOfTheDay />
      </Card>

      {/* Card 2: Church News and Updates */}
      <Card style={styles.card} onPress={() => navigation.navigate('ChurchNewsAndUpdates')}>
        <Text category="h5" style={styles.centerText}>
          Church News and Updates
        </Text>
        <Divider style={styles.divider} />
        {/* Content for Church News and Updates */}
        <Text style={styles.exampleVerse}>
          Stay updated with the latest news and events happening in our church community.
        </Text>
      </Card>

      {/* Calendar width not working */}
      <Card style={styles.card} onPress={() => navigation.navigate('CelebrationEvents')}>
          <Text category="h5" style={styles.centerText}>
            Calendar of Events
          </Text>
          <Divider style={styles.divider} />  
          <View style={styles.calendarContainer}> 
            <Calendar />
          </View>
      </Card>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  carouselContainer: {
    alignItems: 'center', // Center the carousel horizontally
    marginBottom: 15, // Adjust the space below the carousel
  },
  carouselItem: {
    width: '100%',
    height: 200, // Set the desired height for the carousel items
    overflow: 'hidden', // Clip the content to the specified dimensions
  },
  carouselImage: {
    width: '100%',
    height: '100%', // Take up the full height of the parent View
  },
  cardsContainer: {
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
    padding: 16,
  },
  centerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 8,
  },
  exampleVerse: {
    marginTop: 8,
  },
  calendarContainer: {
    width: '10%', // Calendar width
  },
});

export default HomeScreen;

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
    navigation.navigate('ChurchNewsAndUpdates');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header and Logo */}
      <View style={styles.headerContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 16, fontStyle:'italic'}}>
          Welcome, Juan Dela Cruz</Text>
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

      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
          Church News and Updates
        </Text>

      {/* News and Updates Feed */}
      <Card style={styles.card} onPress={() => navigation.navigate('ChurchNewsAndUpdates')}>
        {/* Post 1 */}
        <View style={styles.newsFeedItem}>
          {/* Thumbnail */}
          <Image
            source={require('../assets/images/carousel1.jpg')} // Replace with actual thumbnail source
            style={styles.thumbnail}
          />
          {/* Content */}
          <View style={styles.newsContent}>
            {/* Title */}
            <Text style={styles.newsTitle}>Ika-2 Linggo sa Karaniwang Panahon</Text>
            {/* Caption */}
            <Text style={styles.newsCaption}>We invite you to submit your prayer intentions to be included in our..</Text>
          </View>
        </View>

        {/* Post 2 */}
        <View style={styles.newsFeedItem}>
          {/* Thumbnail */}
          <Image
            source={require('../assets/images/carousel2.jpg')} // Replace with actual thumbnail source
            style={styles.thumbnail}
          />
          {/* Content */}
          <View style={styles.newsContent}>
            {/* Title */}
            <Text style={styles.newsTitle}>𝐋𝐢𝐧𝐠𝐠𝐮𝐡𝐚𝐧𝐠 𝐃𝐞𝐛𝐨𝐬𝐲𝐨𝐧 𝐤𝐚𝐲 𝐒𝐚𝐧 𝐑𝐨𝐪𝐮𝐞</Text>
            {/* Caption */}
            <Text style={styles.newsCaption}>Halina at magdebosyon sa ating Mahal na Patron!</Text>
          </View>
        </View>

        {/* Post 3 */}
        <View style={styles.newsFeedItem}>
          {/* Thumbnail */}
          <Image
            source={require('../assets/images/carousel3.jpg')} // Replace with actual thumbnail source
            style={styles.thumbnail}
          />
          {/* Content */}
          <View style={styles.newsContent}>
            {/* Title */}
            <Text style={styles.newsTitle}>𝐏𝐢𝐬𝐭𝐚 𝐧𝐠 𝐈𝐭𝐢𝐦 𝐧𝐚 𝐍𝐚𝐳𝐚𝐫𝐞𝐧𝐨 | January 9, 2024</Text>
            {/* Caption */}
            <Text style={styles.newsCaption}>Taimtim nating pagnilayan ang paggugunita ng 𝐊𝐚𝐩𝐢𝐬𝐭𝐚𝐡𝐚𝐧 𝐧𝐠 𝐈𝐭𝐢𝐦 𝐧𝐚 𝐍𝐚𝐳𝐚𝐫𝐞𝐧𝐨</Text>
          </View>
        </View>
      </Card>
    </View>

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
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'left',
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
    padding: 5,
    borderRadius: 10,
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
  newsFeedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: -15,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
    resizeMode: 'cover', 
    borderRadius: 10, 
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  newsContent: {
    flex: 1,
  },
  newsCaption: {
    fontSize: 12,
    color: 'gray',
  },
});

export default HomeScreen;

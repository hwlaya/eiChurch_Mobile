import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView, TouchableHighlight   } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { Card, Calendar } from '@ui-kitten/components';

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

  const handleNewsPress = () => {
    navigation.navigate('ChurchNewsAndUpdates');
  };


  return (
    <ScrollView>
    <View style={[styles.container, { marginTop: 100 // Manipulate temporary space
  }]}> 
      <Carousel
        layout={'default'}
        data={carouselImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleCarouselPress}>
            <Image key={item.id} source={item.source} style={styles.carouselImage} />
          </TouchableOpacity>
        )}
        autoplay
        autoplayInterval={3000} // Adjust slide time
        loop
      />

          {/* Bible Verse of the Day Section */}
      <Card style={styles.card}>
      <Text category="h6" style={styles.title}>
        Bible Verse of the Day
      </Text>
      <Text category="p">
        "For God so loved the world that he gave his one and only Son, that whoever believes in
        him shall not perish but have eternal life." - John 3:16
      </Text>
      </Card>

      {/* Church News and Updates Section BROKEN LINK****/} 
      <TouchableOpacity onPress={handleNewsPress} underlayColor="#DDDDDD">
        <Card style={styles.card}>
          <Text category="h6" style={{ marginBottom: 8 }}>
            Church News and Updates
          </Text>
          <Text category="p">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac fringilla turpis, vel
            sollicitudin neque."
          </Text>
        </Card>
      </TouchableOpacity>
    
    

          {/* Calendar */}
    <Card style={styles.calendarCard}>
        <Text category="h6">Calendar</Text>
        <Calendar />
      </Card>
    </View>
    </ScrollView>
      

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
  },
  card: {
    marginVertical: 10,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  calendarCard: {
    margin: 16,
  },
});

export default HomeScreen;

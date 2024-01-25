import React from 'react';
import { View, Text, Image, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {
    const navigation = useNavigation();
  
    return (
      <View style={{ flex: 1, paddingTop: 30, alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Layer 1: Church Logo */}
          <Image
            source={require('../assets/images/church_icon.png')}
            style={{ width: 70, height: 70}}
          />
  
          {/* Layer 2: EiChurch San Roque TITLE */}
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>EiChurch</Text>
            <Text style={{ fontSize: 16, color: 'gray', fontStyle: 'italic' }}>
              San Roque Parish Church
            </Text>
          </View>
  
          {/* Temporary Hamburger Icon */}
          <Image
            source={require('../assets/images/menu-outline.png')}
            style={{ width: 50, height: 50, marginLeft: 50}}
          />
        </View>
  
        {/* Temporary Carousel*/}
        <Image
          source={require('../assets/images/carousel.jpg')} 
          style={{ width: '100%', height: 200, marginTop: 16 }}
        />

        {/* Daily Verse Section */}
        <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Bible Verse of the Day</Text>

        
        <View style={styles.separator} />{/* Line Separator */}
        
        <Text style={[styles.cardTitle2, { marginTop: 30 }]}>Philippians 4:13</Text>
        <Text style={[styles.cardContent, {marginBottom: 30}]}>
        I can do all things through Christ which strengthens me.
        </Text>
        </View>

      </View>


    );
  };

  const styles = StyleSheet.create({
    cardContainer: {
      marginTop: 16,
      padding: 16,
      width: '100%',
      borderRadius: 10,
      backgroundColor: 'white',
      elevation: 3, // Shadow for Android
      shadowColor: 'black', // Shadow for iOS
      shadowOpacity: 0.3,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 2 },
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cardTitle2: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    cardContent: {
      fontSize: 16,
      color: 'black',
      textAlign: 'center',
      marginTop: 8,
    },
    separator: {
        borderTopWidth: 1,
        borderTopColor: 'gray',
        marginVertical: 8,
      },
  });

export default HomeScreen;
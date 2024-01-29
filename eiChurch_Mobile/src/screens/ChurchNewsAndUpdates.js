import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, Divider, Text } from '@ui-kitten/components';

const ChurchNewsAndUpdates = () => {
  return (
    <ScrollView style={styles.container}>
    <View>
      {/* Post 1 */}
      <Card style={styles.card} onPress={() => console.log('Navigate to Post 1')}>
        {/* Thumbnail */}
        <Image
          source={require('../assets/images/carousel1.jpg')} // Replace with actual thumbnail source
          style={styles.thumbnail}
        />
        {/* Content */}
        <View style={styles.newsContent}>
          {/* Title */}
          <Text style={styles.newsTitle}>Ika-2 Linggo sa Karaniwang Panahon</Text>
          <Divider style={styles.divider} />  
          {/* Caption */}
          <Text style={styles.newsCaption}>
            We invite you to submit your prayer intentions to be included in our...
          </Text>
        </View>
      </Card>

      {/* Post 2 */}
      <Card style={styles.card} onPress={() => console.log('Navigate to Post 2')}>
        {/* Thumbnail */}
        <Image
          source={require('../assets/images/carousel2.jpg')} // Replace with actual thumbnail source
          style={styles.thumbnail}
        />
        {/* Content */}
        <View style={styles.newsContent}>
          {/* Title */}
          <Text style={styles.newsTitle}>𝐋𝐢𝐧𝐠𝐠𝐮𝐡𝐚𝐧𝐠 𝐃𝐞𝐛𝐨𝐬𝐲𝐨𝐧 𝐤𝐚𝐲 𝐒𝐚𝐧 𝐑𝐨𝐪𝐮𝐞</Text>
          <Divider style={styles.divider} />  
          {/* Caption */}
          <Text style={styles.newsCaption}>Halina at magdebosyon sa ating Mahal na Patron!</Text>
        </View>
      </Card>

      {/* Post 3 */}
      <Card style={styles.card} onPress={() => console.log('Navigate to Post 3')}>
        {/* Thumbnail */}
        <Image
          source={require('../assets/images/carousel3.jpg')} // Replace with actual thumbnail source
          style={styles.thumbnail}
        />
        {/* Content */}
        <View style={styles.newsContent}>
          {/* Title */}
          <Text style={styles.newsTitle}>𝐏𝐢𝐬𝐭𝐚 𝐧𝐠 𝐈𝐭𝐢𝐦 𝐧𝐚 𝐍𝐚𝐳𝐚𝐫𝐞𝐧𝐨 | January 9, 2024</Text>
          <Divider style={styles.divider} />  
          {/* Caption */}
          <Text style={styles.newsCaption}>
            Taimtim nating pagnilayan ang paggugunita ng 𝐊𝐚𝐩𝐢𝐬𝐭𝐚𝐡𝐚𝐧 𝐧𝐠 𝐈𝐭𝐢𝐦 𝐧𝐚 𝐍𝐚𝐳𝐚𝐫𝐞𝐧𝐨
          </Text>
        </View>
      </Card>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    marginVertical: 7,
    borderRadius: 10,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 3,
  },
  newsContent: {

  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  newsCaption: {
    fontSize: 14,
  },
  divider: {
    marginVertical: 2,
    backgroundColor:'#949494',
  },
});

export default ChurchNewsAndUpdates;

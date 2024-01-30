import { Calendar, Divider } from '@ui-kitten/components';
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const CelebrationEvents = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Celebration Events Page</Text>

        {/* Calendar */}
        <View>
          <Calendar />
          
        </View>

        {/* Announcements */}
        <View style={{ flex: 1, width: '100%' }}>
        <Divider style={{ backgroundColor: 'black', marginVertical: 8, width: '100%' }} />
          {/* Example 1: Date with Event */}
          <View>
            <Text style={styles.date}>January 15, 2024</Text>
            <Text style={styles.eventName}>Church Service</Text>
            <Text style={styles.eventTime}>10:00 AM</Text>
          </View>
          <Divider style={{ backgroundColor: 'black', marginVertical: 8, width: '100%' }} />
          {/* Example 2: Date with Event */}
          <View>
            <Text style={styles.date}>February 1, 2024</Text>
            <Text style={styles.eventName}>Community Outreach</Text>
            <Text style={styles.eventTime}>2:00 PM</Text>
          </View>
          <Divider style={{ backgroundColor: 'black', marginVertical: 8, width: '100%' }} />
          {/* Example 3: Date with Event */}
          <View>
            <Text style={styles.date}>March 10, 2024</Text>
            <Text style={styles.eventName}>Bible Study</Text>
            <Text style={styles.eventTime}>7:00 PM</Text>
          </View>

          {/* Divider */}
          <Divider style={{ backgroundColor: 'black', marginVertical: 8, width: '100%' }} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventName: {
    fontSize: 14,
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 12,
    color: 'gray',
  },
});

export default CelebrationEvents;

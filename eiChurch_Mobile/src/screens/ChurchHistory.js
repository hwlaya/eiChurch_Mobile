import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from '@ui-kitten/components';

const ChurchHistory = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text category="h4" style={styles.title}>
          Church History
        </Text>
        <Text category="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
        {/* Add more paragraphs or details about the church history */}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
});

export default ChurchHistory;
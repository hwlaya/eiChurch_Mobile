import { Divider } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const BibleVerseOfTheDay = () => {
  const [verse, setVerse] = useState({ text: '', reference: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json' },
    };

    fetch('https://beta.ourmanna.com/api/v1/get?format=json&order=daily', options)
      .then((response) => response.json())
      .then((data) => {
        setVerse({
          text: data.verse.details.text,
          reference: data.verse.details.reference,
        });
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching Bible verse:', error));
  }, []);

return (
  <View>
    <Text category="h5" style={{ fontSize: 24, marginBottom: 8, fontWeight: 'bold', textAlign: 'center', }}>
      Bible Verse of the Day
    </Text>
    <Divider style={{marginVertical: 5, backgroundColor: '#949494'}} />
    {loading ? (
      <ActivityIndicator size="small" color="#3366FF" />
    ) : (
      <>
        <Text style={{ fontSize: 18, fontStyle: 'italic'}}>{verse.text}</Text>
        <Text style={{ marginTop: 8 }}>- {verse.reference}</Text>

        <View style={{ position: 'absolute', bottom: 0, right: 0, margin: -30 }}>
          <Text style={{ color: 'gray', fontStyle: 'italic', fontSize: 8}}>Powered by OurManna.com</Text>
        </View>
      </>
    )}
  </View>
);
};
export default BibleVerseOfTheDay;



import { Divider } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const BibleVerseOfTheDay = () => {
  const [verse, setVerse] = useState({ text: "", reference: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    fetch(
      "https://beta.ourmanna.com/api/v1/get?format=json&order=daily",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setVerse({
          text: data.verse.details.text,
          reference: data.verse.details.reference,
        });
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching Bible verse:", error));
  }, []);

  return (
    <View style={{ position: "relative" }}>
      <Text
        category="h2"
        style={{
          fontSize: 20,
          marginBottom: 8,
          fontFamily: "Montserrat-Bold",
          textAlign: "center",
        }}
      >
        Bible Verse of the Day
      </Text>
      <Divider
        style={{
          marginVertical: 5,
          backgroundColor: "#949494",
          marginBottom: 10,
        }}
      />
      {loading ? (
        <ActivityIndicator size="small" color="#3366FF" />
      ) : (
        <>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Montserrat-Italic",
            }}
          >
            {verse.text}
          </Text>
          <Text style={{ marginTop: 8, fontFamily: "Montserrat-Light" }}>
            - {verse.reference}
          </Text>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <Text style={{ color: "gray", fontStyle: "italic", fontSize: 8 }}>
              Powered by OurManna.com
            </Text>
          </View>
        </>
      )}
    </View>
  );
};
export default BibleVerseOfTheDay;

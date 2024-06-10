import { Image, ScrollView, StyleSheet, View } from "react-native";
import CustomBackButton from "../components/ui/CustomBackButton";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../config/api";
import { Button, Card } from "@ui-kitten/components";
import { FILE_PATH } from "../../config/directory";

const ExploreGalleryPage = () => {
  const navigation = useNavigation();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    api
      .get("gallery/all")
      .then((response) => {
        setGallery(response.data.gallery_images);
      })
      .catch((err) => {
        console.log(err);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get("gallery/all")
        .then((response) => {
          setGallery(response.data.gallery_images);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text variant="headlineSmall" style={styles.textStyle}>
          Gallery
        </Text>
        {gallery ? (
          <>
            {gallery.map((data, index) => (
              <View style={{ marginBottom: 20 }} key={index}>
                <Card>
                  <View style={{ height: 200, marginBottom: 10 }}>
                    <Image
                      source={{
                        uri: `${FILE_PATH}/gallery/${data.id}/thumbnail/${data.gallery_thumbnail}`,
                      }}
                      style={{ flex: 1, resizeMode: "contain" }}
                    />
                  </View>
                  <Text
                    variant="titleLarge"
                    style={{ textAlign: "center", marginBottom: 10 }}
                  >
                    {data.gallery_title}
                  </Text>
                  <Button
                    size="small"
                    onPress={() => {
                      navigation.navigate("ExploreGalleryPageView", {
                        id: data.id,
                      });
                    }}
                  >
                    View
                  </Button>
                </Card>
              </View>
            ))}
          </>
        ) : (
          <Card>
            <Text>No gallery data available.</Text>
          </Card>
        )}
        <CustomBackButton route={"ExplorePage"} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 10,
    fontFamily: "Montserrat-Bold",
    color: "black",
    textAlign: "left",
  },
});

export default ExploreGalleryPage;

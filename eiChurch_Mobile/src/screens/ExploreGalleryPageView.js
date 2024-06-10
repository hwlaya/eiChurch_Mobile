import { Image, ScrollView, StyleSheet, View } from "react-native";
import CustomBackButton from "../components/ui/CustomBackButton";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../config/api";
import { Button, Card } from "@ui-kitten/components";
import { FILE_PATH } from "../../config/directory";

const ExploreGalleryPageView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    api
      .get("gallery/all")
      .then((response) => {
        const gallery = response.data.gallery_images;
        const galleryId = gallery.filter((gallery) => gallery.id == id);
        setGallery(galleryId[0].gallery_images);
      })
      .catch((err) => {
        console.log(err);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get("gallery/all")
        .then((response) => {
          const gallery = response.data.gallery_images;
          const galleryId = gallery.filter((gallery) => gallery.id == id);
          setGallery(galleryId[0].gallery_images);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return unsubscribe;
  }, [navigation, id]);
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
                        uri: `${FILE_PATH}/gallery/${data.pivot.gallery_id}/images/${data.filename}`,
                      }}
                      style={{ flex: 1, resizeMode: "contain" }}
                      onError={(error) => console.error(error.onError)}
                    />
                  </View>
                </Card>
              </View>
            ))}
          </>
        ) : (
          <Card>
            <Text>No gallery data available.</Text>
          </Card>
        )}
        <CustomBackButton route={"ExploreGalleryPage"} />
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

export default ExploreGalleryPageView;

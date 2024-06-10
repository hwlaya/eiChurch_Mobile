import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import CustomBackButton from "../components/ui/CustomBackButton";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { Card } from "@ui-kitten/components";
import { FILE_PATH } from "../../config/directory";

const ChurchNewsAndUpdatesView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    api
      .get(`announcement/all`)
      .then((response) => {
        const announcements = response.data.announcements;
        const announcementId = announcements.filter(
          (announcement) => announcement.id == id
        );
        setAnnouncement(announcementId);
      })
      .catch((err) => {
        console.log(err);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get(`announcement/all`)
        .then((response) => {
          const announcements = response.data.announcements;
          const announcementId = announcements.filter(
            (announcement) => announcement.id == id
          );
          setAnnouncement(announcementId[0]);
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
        <Card>
          {announcement ? (
            <>
              <View style={{ height: 200, marginBottom: 20 }}>
                <Image
                  source={{
                    uri: `${FILE_PATH}/announcements/${announcement.announcement_image}`,
                  }}
                  style={{
                    flex: 1,
                    resizeMode: "contain",
                  }}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text
                  variant="headlineMedium"
                  style={{ marginBottom: 10, textAlign: "center" }}
                >
                  {announcement.announcement_title}
                </Text>
                <Text variant="bodyLarge" style={{ textAlign: "justify" }}>
                  {announcement.announcement_content}
                </Text>
              </View>
            </>
          ) : (
            <Text>No announcements available.</Text>
          )}
        </Card>
        <CustomBackButton route="ChurchNewsAndUpdates" />
      </View>
    </ScrollView>
  );
};

export default ChurchNewsAndUpdatesView;

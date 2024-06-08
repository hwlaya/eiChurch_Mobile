import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Image, View } from "react-native";
import { Text } from "react-native-paper";
import CustomBackButton from "../components/ui/CustomBackButton";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { Card } from "@ui-kitten/components";
import { FILE_PATH } from "../../config/directory";

const AccomplishmentView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [accomplishment, setAccomplishment] = useState(null);

  useEffect(() => {
    api
      .get("accomplishment/all")
      .then((response) => {
        const accomplishment = response.data.accomplishments;
        const accomplishmentId = accomplishment.filter((data) => data.id == id);
        setAccomplishment(accomplishmentId[0]);
      })
      .catch((err) => {
        Alert.alert("Error!", "Error fetching accomplishments");
        console.log(err);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get("accomplishment/all")
        .then((response) => {
          const accomplishment = response.data.accomplishments;
          const accomplishmentId = accomplishment.filter(
            (data) => data.id == id
          );
          setAccomplishment(accomplishmentId[0]);
        })
        .catch((err) => {
          Alert.alert("Error!", "Error fetching accomplishments");
          console.log(err);
        });
    });

    return unsubscribe;
  }, [navigation, id]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Card>
        {accomplishment ? (
          <>
            <View style={{ height: 200, marginBottom: 20 }}>
              <Image
                source={{
                  uri: `${FILE_PATH}/accomplishments/${accomplishment.accomplishment_image}`,
                }}
                style={{ flex: 1, resizeMode: "contain" }}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text
                variant="headlineMedium"
                style={{ marginBottom: 10, textAlign: "center" }}
              >
                {accomplishment.accomplishment_title}
              </Text>
              <Text variant="bodyLarge" style={{ textAlign: "justify" }}>
                {accomplishment.accomplishment_content}
              </Text>
            </View>
          </>
        ) : (
          <Text>No accomplishment details available.</Text>
        )}
      </Card>
      <CustomBackButton route="Accomplishments" />
    </View>
  );
};

export default AccomplishmentView;

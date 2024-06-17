import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import CustomBackButton from "../components/ui/CustomBackButton";

const ReservationWebView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { reservation_schedule } = route.params;
  const webViewRef = useRef(null);
  const [uri, setUri] = useState(
    decodeURI(
      `http://192.168.1.11:8000/api/reservation/pay/${reservation_schedule}`
    )
  );
  const [key, setKey] = useState(0);

  useEffect(() => {
    const decodUri = decodeURI(
      `http://192.168.1.11:8000/api/reservation/pay/${reservation_schedule}`
    ); // change the URI to prod
    setUri(decodUri);

    const unsubscribe = navigation.addListener("focus", () => {
      setKey((prevKey) => prevKey + 1);
      setUri(decodUri);
    });

    return unsubscribe;
  }, [navigation, uri, reservation_schedule]);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <CustomBackButton route={`ReservationIndex`} />
      <WebView
        key={key}
        ref={webViewRef}
        pullToRefreshEnabled
        style={{ width: 360, height: "100%" }}
        source={{
          uri: uri,
        }}
      />
    </View>
  );
};

export default ReservationWebView;

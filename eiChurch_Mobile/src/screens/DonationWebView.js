import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import CustomBackButton from "../components/ui/CustomBackButton";

const DonationWebView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, amount } = route.params;
  const webViewRef = useRef(null);
  const [uri, setUri] = useState(
    decodeURI(`https://sanroqueparish.com/api/pay/${id}/${amount}`)
  );
  const [key, setKey] = useState(0);

  useEffect(() => {
    const decodUri = decodeURI(
      `https://sanroqueparish.com/api/pay/${id}/${amount}`
    ); // change the URI to prod
    setUri(decodUri);

    const unsubscribe = navigation.addListener("focus", () => {
      setKey((prevKey) => prevKey + 1);
      setUri(decodUri);
    });

    return unsubscribe;
  }, [navigation, uri, id, amount]);

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
      <CustomBackButton route={`DonationIndex`} />
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

export default DonationWebView;

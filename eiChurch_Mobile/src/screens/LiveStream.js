import { useRoute } from "@react-navigation/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { WebView } from "react-native-webview";
import { Camera } from "expo-camera";
import { UserContext } from "../providers/UserProvider";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const LiveStream = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useContext(UserContext);
  const { token, room } = route.params;
  const webViewRef = useRef(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    console.log(
      decodeURI(
        `https://sanroqueparish.com/joinlive?jwt=${token}&room=${room}&reloadKey=${reloadKey}`
      )
    );
  }, [reloadKey]);

  const handleRefresh = () => {
    // Increment reload key to trigger reload
    setReloadKey((prevKey) => prevKey + 1);
  };

  const handleForceReload = () => {
    // Reload the WebView
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleClearCache = () => {
    // Clear WebView cache
    if (webViewRef.current) {
      webViewRef.current.clearCache(true);
    }
  };

  const handlePermissionRequest = async (event) => {
    // Handle permission request
    const { origin, permission } = event;
    console.log(`Permission request from ${origin}:`, permission);

    if (permission === "media") {
      // Check if camera permission is granted
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") {
        // Camera permission granted, grant microphone permission as well
        return true;
      } else {
        // Camera permission not granted, deny permission
        return false;
      }
    }

    return false; // Deny permission for other requests
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
        flex: 1,
      }}
    >
      <Header
        logoSource={require("../assets/images/church_icon.png")}
        title="eiChurch"
        subtitle="San Roque Parish Church"
      />
      <WebView
        ref={webViewRef}
        pullToRefreshEnabled
        style={{ width: 360, height: "100%" }}
        source={{
          uri: decodeURI(
            `https://sanroqueparish.com/joinlive?jwt=${token}&room=${room}&reloadKey=${reloadKey}`
          ),
        }}
        onPermissionRequest={handlePermissionRequest}
      />
      {/* <Button onPress={handleRefresh}>Force Refresh</Button>
      <Button onPress={handleForceReload}>Force Reload</Button>
      <Button onPress={handleClearCache}>Clear Cache</Button> */}
      <Button
        onPress={() => navigation.navigate("HomeScreen")}
        icon={() => <Icon name="arrow-left" size={50} color={"#000"} />}
      />
    </View>
  );
};

export default LiveStream;

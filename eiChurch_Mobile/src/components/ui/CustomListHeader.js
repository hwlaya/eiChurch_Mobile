import { View } from "react-native";
import { Text } from "react-native-paper";

const CustomListHeader = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 15,
      }}
    >
      <View
        style={{
          borderColor: "#1E1B4B",
          borderWidth: 3,
          height: 25,
          marginRight: 3,
        }}
      ></View>
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>{title}</Text>
    </View>
  );
};

export default CustomListHeader;

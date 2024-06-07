import { View } from "react-native";
import { Text } from "react-native-paper";

const CustomListItem = ({ title, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 20,
      }}
    >
      <Text style={{ fontWeight: "bold", flex: 1 }}>{title}</Text>
      <Text style={{ flexShrink: 3 }}>{value}</Text>
    </View>
  );
};

export default CustomListItem;

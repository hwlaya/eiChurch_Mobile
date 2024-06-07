import { useNavigation } from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import { View } from "react-native";

const CustomBackButton = ({ route }) => {
  const navigation = useNavigation();

  return (
    <View style={{ width: 61, marginTop: 10, marginBottom: 10 }}>
      <Button
        size="small"
        appearance="outline"
        status="basic"
        onPress={() => navigation.navigate(route)}
      >
        Back
      </Button>
    </View>
  );
};

export default CustomBackButton;

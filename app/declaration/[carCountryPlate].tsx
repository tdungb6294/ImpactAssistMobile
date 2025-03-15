import { View } from "react-native";
import { Text } from "react-native-paper";
import Declaration from "../../components/declaration";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const { carCountryPlate } = useLocalSearchParams();
  return (
    <View>
      <Text>{carCountryPlate}</Text>
      <Declaration carCountryPlate={carCountryPlate as string} />
    </View>
  );
}

import { View } from "react-native";
import { Text } from "react-native-paper";
import Declaration from "../../components/declaration";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { carCountryPlate } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Declaration carCountryPlate={carCountryPlate as string} />
    </SafeAreaView>
  );
}

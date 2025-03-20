import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Declaration from "../../components/declaration/declaration";

export default function DeclarationPage() {
  const { carCountryPlate } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Declaration carCountryPlate={carCountryPlate as string} />
    </SafeAreaView>
  );
}

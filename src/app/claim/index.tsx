import { SafeAreaView } from "react-native-safe-area-context";
import Claim from "../../components/claim/claim";

export default function ClaimPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Claim />
    </SafeAreaView>
  );
}

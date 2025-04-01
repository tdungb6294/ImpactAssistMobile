import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { List, useTheme } from "react-native-paper";
import ImpactAssistButton from "../../components/custom/button";

export default function ClaimsPage() {
  const [visible, setVisibile] = useState(false);
  const theme = useTheme();

  const showModal = () => setVisibile(true);
  const hideModal = () => setVisibile(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        gap: 6,
      }}
    >
      <Link href={"/claim"} asChild>
        <ImpactAssistButton onPress={showModal} label="Create New Claim" />
      </Link>
      <List.Section>
        <List.Item
          title="Claim 1"
          description="Description of Claim 1"
          onPress={() => {}}
        />
        <List.Item
          title="Claim 2"
          description="Description of Claim 2"
          onPress={() => {}}
        />
        <List.Item
          title="Claim 3"
          description="Description of Claim 3"
          onPress={() => {}}
        />
      </List.Section>
    </View>
  );
}

import { useEffect } from "react";
import { Text } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { Declaration } from "../model/declaration";

interface DeclarationFirstCarProps {
  declaration: Declaration;
}

export default function DeclarationFirstCar({
  declaration,
}: DeclarationFirstCarProps) {
  useEffect(() => {
    console.log("declaration first is here");
  }, []);

  return (
    <Tabs.ScrollView>
      <Text>First Car</Text>
      <Text>First Car</Text>
      <Text>First Car</Text>
      <Text>First Car</Text>
      <Text>First Car</Text>
      <Text>First Car</Text>
    </Tabs.ScrollView>
  );
}

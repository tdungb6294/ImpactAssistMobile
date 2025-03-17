import { Tabs } from "react-native-collapsible-tab-view";
import { Text } from "react-native-paper";
import { Declaration } from "../model/declaration";

interface DeclarationSecondCarProps {
  declaration: Declaration;
}

export default function DeclarationSecondCar({
  declaration,
}: DeclarationSecondCarProps) {
  return (
    <Tabs.ScrollView>
      <Text>First Car</Text>
    </Tabs.ScrollView>
  );
}

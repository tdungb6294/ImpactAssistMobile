import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { LocalExpert } from "../../model/local-expert";
import { CustomTheme } from "../../theme/theme";

interface LocalExpertCardProps {
  localExpert: LocalExpert;
}

export default function LocalExpertCard({ localExpert }: LocalExpertCardProps) {
  const theme: CustomTheme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.text,
        },
      ]}
    >
      <View style={[styles.secondaryContainer]}>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            Local Expert
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {localExpert.fullName}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            Description
          </Text>
          <Text numberOfLines={1} style={{ color: theme.colors.text }}>
            {localExpert.description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    gap: 8,
  },
  secondaryContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
    gap: 8,
  },
});

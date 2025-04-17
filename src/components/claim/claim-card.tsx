import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import { PartialClaim } from "../../utils/fetch-claims";

interface ClaimCardProps {
  claim: PartialClaim;
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const now = dayjs(claim.accidentDatetime);
  const formatted = now.format("YYYY-MM-DD HH:mm");
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
            Vehicle Model
          </Text>
          <Text style={{ color: theme.colors.text }}>{claim.carModel}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: theme.colors.text, fontWeight: "bold" }}>
            {formatted}
          </Text>
          <Text style={{ color: theme.colors.text, fontWeight: "bold" }}>
            {claim.claimStatus}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
          Address
        </Text>
        <Text numberOfLines={1} style={{ color: theme.colors.text }}>
          {claim.address}
        </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
});

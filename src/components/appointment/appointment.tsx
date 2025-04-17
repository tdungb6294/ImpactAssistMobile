import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import { fetchLocalExperts } from "../../utils/fetch-local-experts";

export default function AppointmentPage() {
  const range = Array.from({ length: 4 }, (_, index) => index + 1);
  const query = useQuery({
    queryKey: ["local_experts"],
    queryFn: async () => fetchLocalExperts(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  const router = useRouter();

  const theme: CustomTheme = useTheme();

  return (
    <View>
      <Text> Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 70,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    marginVertical: 8,
  },
  item: {
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    marginVertical: 8,
  },
});

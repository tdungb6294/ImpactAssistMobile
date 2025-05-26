import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { TouchableRipple, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import { fetchLocalExperts } from "../../utils/fetch-local-experts";
import LocalExpertCard from "../local-expert/local-expert-card";

export default function AppointmentPage() {
  const flatListRef = useRef<FlatList>(null);
  const theme: CustomTheme = useTheme();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState<number>(-1);
  const { isFetching, refetch, data } = useQuery({
    queryKey: ["local_experts"],
    queryFn: async () => fetchLocalExperts(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  const allLocalExperts = data ?? [];
  const scrollToItem = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          padding: 20,
          gap: 6,
        }}
      >
        <FlatList
          ref={flatListRef}
          data={allLocalExperts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableRipple
              style={{
                flex: 1,
                borderWidth: isFocused === index ? 1 : 0,
                borderColor: theme.colors.borderSeparatorTertiary,
                borderRadius: 6,
              }}
              onPress={() => {
                router.navigate(`/appointment/local-expert/${item.id}`);
              }}
            >
              <LocalExpertCard localExpert={item} />
            </TouchableRipple>
          )}
          style={{
            marginTop: 8,
          }}
          contentContainerStyle={{
            gap: 16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => refetch()}
            />
          }
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          padding: 20,
        }}
      >
        {allLocalExperts.length > 0 && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: allLocalExperts.at(0)?.latitude || 0,
              longitude: allLocalExperts.at(0)?.longitude || 0,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
            zoomEnabled={true}
            rotateEnabled={false}
          >
            {allLocalExperts.map((localExpert, index) => (
              <Marker
                key={localExpert.id}
                coordinate={{
                  latitude: localExpert.latitude,
                  longitude: localExpert.longitude,
                }}
                title={localExpert.fullName}
                description={localExpert.description}
                onPress={() => {
                  scrollToItem(index);
                  setIsFocused(index);
                }}
              />
            ))}
          </MapView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

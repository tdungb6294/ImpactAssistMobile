import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { Modal, Portal, TouchableRipple, useTheme } from "react-native-paper";
import ClaimCard from "../../components/claim/claim-card";
import ClaimPopupConnection from "../../components/claim/claim-popup-connection";
import ImpactAssistButton from "../../components/custom/button";
import { CustomTheme } from "../../theme/theme";
import { fetchCarClaims, PartialClaimPage } from "../../utils/fetch-claims";

export default function ClaimsPage() {
  const theme: CustomTheme = useTheme();
  const [visible, setVisibile] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const { data, isFetching, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<PartialClaimPage>({
      queryKey: ["claims"],
      queryFn: fetchCarClaims,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });

  const allClaims = data?.pages.flatMap((page) => page.claims) ?? [];

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
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <ClaimPopupConnection hideModal={hideModal} />
        </Modal>
      </Portal>
      <ImpactAssistButton
        onPress={() => {
          showModal();
        }}
        label={t("Create New Claim")}
      />
      <View>
        <Text style={{ color: theme.colors.text, marginTop: 8 }}>
          {t("Items")}: {allClaims.length} {t("of")} {data?.pages[0].total ?? 0}
        </Text>
      </View>
      <FlatList
        data={allClaims}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableRipple
            style={{ flex: 1 }}
            onPress={() => {
              if (item.claimType === "Vehicle") {
                router.navigate(`/claim/car/${item.id}`);
              } else {
                router.navigate(`/claim/object/${item.id}`);
              }
            }}
          >
            <ClaimCard claim={item} />
          </TouchableRipple>
        )}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshing={isFetching}
        onRefresh={() => {
          refetch();
        }}
        style={{
          marginTop: 8,
          marginBottom: 80,
        }}
        contentContainerStyle={{
          gap: 16,
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />
        }
      />
    </View>
  );
}

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { Modal, Portal, TouchableRipple, useTheme } from "react-native-paper";
import ClaimCard from "../../components/claim/claim-card";
import ClaimPopupConnection from "../../components/claim/claim-popup-connection";
import ImpactAssistButton from "../../components/custom/button";
import ImpactAssistEnumSelector from "../../components/custom/enum-selector";
import { ClaimStatus } from "../../model/enum/claim-status";
import { CustomTheme } from "../../theme/theme";
import { fetchCarClaims, PartialClaimPage } from "../../utils/fetch-claims";
import { RoleContext } from "../_layout";

export default function ClaimsPage() {
  const theme: CustomTheme = useTheme();
  const [visible, setVisibile] = useState(false);
  const [showEnumSelector, setShowEnumSelector] = useState(false);
  const showModal = () => setVisibile(true);
  const hideModal = () => setVisibile(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { role } = useContext(RoleContext);
  const [claimStatus, setClaimStatus] = useState<ClaimStatus[]>([]);

  const { data, isFetching, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<PartialClaimPage>({
      queryKey: ["claims"],
      queryFn: ({ pageParam }) =>
        fetchCarClaims({
          pageParam,
          expert: role === "LOCAL_EXPERT",
          claimStatus,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });

  useEffect(() => {
    refetch();
  }, [claimStatus]);

  const allClaims = data?.pages.flatMap((page) => page.claims) ?? [];

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
      {showEnumSelector && (
        <ImpactAssistEnumSelector
          enumType={ClaimStatus}
          visible={showEnumSelector}
          onDismiss={() => setShowEnumSelector(false)}
          setSelectedValue={(value) => {
            const newStatus = ClaimStatus[value as keyof typeof ClaimStatus];
            if (!claimStatus.includes(newStatus)) {
              setClaimStatus((prev) => [...prev, newStatus]);
            }
          }}
        />
      )}
      <ImpactAssistButton
        onPress={() => {
          showModal();
        }}
        label={t("Create New Claim")}
      />
      <View
        style={{
          alignContent: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 8,
        }}
      >
        <Text style={{ color: theme.colors.text }}>
          {t("Items")}: {allClaims.length} {t("of")}{" "}
          {data?.pages.at(0)?.total ?? 0}
        </Text>
        <ImpactAssistButton
          onPress={() => {
            setShowEnumSelector(true);
          }}
          label={t("Status")}
          style={{
            height: 24,
            width: 96,
          }}
        />
      </View>
      {claimStatus.length > 0 && (
        <View
          style={{
            alignContent: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 8,
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {claimStatus.map((status, index) => (
            <ImpactAssistButton
              key={index}
              label={t(status)}
              onPress={() => {
                setClaimStatus((prev) => prev.filter((s) => s !== status));
              }}
              style={{
                height: 24,
                paddingHorizontal: 4,
              }}
            />
          ))}
        </View>
      )}
      <FlatList
        data={allClaims}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableRipple
            key={index}
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

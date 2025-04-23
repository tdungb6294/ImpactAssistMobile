import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { File, Paths } from "expo-file-system/next";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ActivityIndicator, Modal, Portal, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import WebView from "react-native-webview";
import ImpactAssistButton from "../../../../components/custom/button";
import LocalExpertFlatList from "../../../../components/local-expert/local-expert-flat-list";
import { CustomTheme } from "../../../../theme/theme";
import { fetchObjectClaimDetails } from "../../../../utils/fetch-object-claim-details";

export default function CarClaimPage() {
  const theme: CustomTheme = useTheme();
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const [visible, setVisibile] = useState(false);
  const showModal = () => setVisibile(true);
  const hideModal = () => setVisibile(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["claim", id],
    queryFn: async () => fetchObjectClaimDetails(parseInt(id as string)),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  const now = dayjs(data?.accidentDatetime);
  const formatted = now.format("YYYY-MM-DD HH:mm");
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <ScrollView
      style={[
        styles.container,
        {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => {
            refetch();
          }}
        />
      }
    >
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <LocalExpertFlatList claimId={Number(id)} hideModal={hideModal} />
        </Modal>
      </Portal>
      <View
        style={{
          padding: 8,
          marginBottom: 8,
          borderRadius: 6,
          backgroundColor: theme.colors.text,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.background,
            fontWeight: "bold",
          }}
        >
          {t("Details")}
        </Text>
      </View>
      <View
        style={[styles.secondaryContainer, { borderColor: theme.colors.text }]}
      >
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Object Type")}
          </Text>
          <Text style={{ color: theme.colors.text }}>{data?.objectType}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Status")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {t(data?.claimStatus || "Unknown")}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Date")}
          </Text>
          <Text style={{ color: theme.colors.text }}>{formatted}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Object Material")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {data?.objectMaterial}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Object Ownership")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {data?.objectOwnership}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Damage To Object Description")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {data?.damageToObjectDescription}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Insurance Policy Number")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {data?.insurancePolicyNumber}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Insurance Company")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {data?.insuranceCompany}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Accident Address")}
          </Text>
          <Text style={{ color: theme.colors.text }}>{data?.address}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Description")}
          </Text>
          <Text numberOfLines={4} style={{ color: theme.colors.text }}>
            {data?.description}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Police Involved")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {data?.policeInvolved ? "Yes" : "No"}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Police Report Number")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {data?.policeReportNumber}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Weather Condition")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {data?.weatherCondition}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Compensation Method")}
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {data?.compensationMethod}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Additional Notes")}
          </Text>
          <Text numberOfLines={4} style={{ color: theme.colors.text }}>
            {data?.additionalNotes}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            IBAN
          </Text>
          <Text numberOfLines={4} style={{ color: theme.colors.text }}>
            {data?.internationalBankAccountNumber}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 8,
          marginTop: 8,
          marginBottom: 8,
          borderRadius: 6,
          backgroundColor: theme.colors.text,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.background,
            fontWeight: "bold",
          }}
        >
          {t("Images")}
        </Text>
      </View>
      <View
        style={[styles.secondaryContainer, { borderColor: theme.colors.text }]}
      >
        {data?.claimAccidentImageUrls.map((imageUrl, index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.text,
                  fontWeight: "bold",
                  marginBottom: 4,
                }}
              >
                {index + 1} {t("Image")}
              </Text>
              {isDownloading ? (
                <ActivityIndicator />
              ) : (
                <Icon
                  name="sharealt"
                  size={20}
                  color={theme.colors.text}
                  onPress={async () => {
                    setIsDownloading(true);
                    const url = imageUrl;
                    const cleanUrl = url.split("?")[0];
                    const fileName = cleanUrl.split("/").pop();
                    const file = new File(Paths.cache, fileName ?? "");
                    if (file.exists) {
                      Sharing.shareAsync(file.uri);
                      setIsDownloading(false);
                      return;
                    }
                    try {
                      const output = await File.downloadFileAsync(
                        url,
                        Paths.cache
                      );
                      Sharing.shareAsync(output.uri);
                      console.log(output.exists);
                      console.log(output.uri);
                    } catch (error) {
                      console.error("Error downloading file:", error);
                      Alert.alert("Error", "Failed to download document");
                    }
                    setIsDownloading(false);
                  }}
                />
              )}
            </View>
            <View
              style={{
                overflow: "hidden",
              }}
            >
              <View
                style={[
                  {
                    height: 200,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  },
                ]}
              >
                <Image
                  style={styles.image}
                  source={imageUrl}
                  placeholder={{ blurhash }}
                  contentFit="contain"
                  transition={1000}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
      <View
        style={{
          padding: 8,
          marginTop: 8,
          marginBottom: 8,
          borderRadius: 6,
          backgroundColor: theme.colors.text,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.background,
            fontWeight: "bold",
          }}
        >
          {t("Documents")}
        </Text>
      </View>
      <View
        style={[styles.secondaryContainer, { borderColor: theme.colors.text }]}
      >
        {data?.claimAccidentDocuments.map((document, index) => (
          <View
            style={{
              flex: 1,
            }}
            key={index}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.text,
                  fontWeight: "bold",
                  marginBottom: 4,
                }}
              >
                {index + 1} {t("Document")}
              </Text>
              {isDownloading ? (
                <ActivityIndicator />
              ) : (
                <Icon
                  name="sharealt"
                  size={20}
                  color={theme.colors.text}
                  onPress={async () => {
                    setIsDownloading(true);
                    const url = document.url;
                    const cleanUrl = url.split("?")[0];
                    const fileName = cleanUrl.split("/").pop();
                    const file = new File(Paths.cache, fileName ?? "");
                    if (file.exists) {
                      Sharing.shareAsync(file.uri);
                      setIsDownloading(false);
                      return;
                    }
                    try {
                      const output = await File.downloadFileAsync(
                        url,
                        Paths.cache
                      );
                      Sharing.shareAsync(output.uri);
                      console.log(output.exists);
                      console.log(output.uri);
                    } catch (error) {
                      console.error("Error downloading file:", error);
                      Alert.alert("Error", "Failed to download document");
                    }
                    setIsDownloading(false);
                  }}
                />
              )}
            </View>
            <WebView
              style={{
                width: "100%",
                height: 200,
              }}
              androidZoomEnabled={true}
              scalesPageToFit={true}
              source={{ uri: document.url }}
            />
          </View>
        ))}
      </View>
      <ImpactAssistButton
        label={t("Share claim with local expert")}
        style={{ marginTop: 8 }}
        onPress={() => {
          showModal();
        }}
      />
      <ImpactAssistButton
        label={t("Create Report Estimate")}
        style={{ marginTop: 8 }}
        onPress={() => {
          router.navigate(`/claim/damage-report/create/${id}`);
        }}
      />
      <ImpactAssistButton
        label={t("Check Reports")}
        style={{ marginTop: 8 }}
        onPress={() => {
          router.navigate(`/claim/damage-report/${id}`);
        }}
      />
      <View style={{ marginBottom: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  secondaryContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    gap: 8,
  },
  image: {
    flex: 1,
    height: 200,
    width: "100%",
  },
});

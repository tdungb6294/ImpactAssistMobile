import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { CustomTheme } from "../../../../theme/theme";
import { fetchObjectClaimDetails } from "../../../../utils/fetch-object-claim-details";

export default function CarClaimPage() {
  const theme: CustomTheme = useTheme();
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();

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

  const imageUrl = data?.claimAccidentImageUrls[0];
  console.log(imageUrl);

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
          <Text style={{ color: theme.colors.text }}>{data?.claimStatus}</Text>
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
          {t("Documents")}
        </Text>
      </View>
      <View
        style={[styles.secondaryContainer, { borderColor: theme.colors.text }]}
      >
        {data?.claimAccidentDocuments.map((document, index) => (
          <TouchableRipple
            style={{ flex: 1 }}
            onPress={async () => {
              const url = document.url;
              const cleanUrl = url.split("?")[0];
              const fileName = cleanUrl.split("/").pop();
              const result = await FileSystem.downloadAsync(
                url,
                FileSystem.documentDirectory + "/" + fileName
              );
              if (result.status === 200) {
                Alert.alert("Document downloaded", result.uri);
              }
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
              <Icon name="download" size={24} color={theme.colors.text} />
            </View>
          </TouchableRipple>
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
          {t("Images")}
        </Text>
      </View>
      <View
        style={[styles.secondaryContainer, { borderColor: theme.colors.text }]}
      >
        {data?.claimAccidentImageUrls.map((imageUrl, index) => (
          <View key={index}>
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
            <Image
              style={styles.image}
              source={imageUrl}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </View>
        ))}
      </View>
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
    backgroundColor: "#0553",
  },
});

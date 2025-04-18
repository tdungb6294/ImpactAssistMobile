import { Redirect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { Controller, get, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, Text, View } from "react-native";
import { ActivityIndicator, HelperText, useTheme } from "react-native-paper";
import ImpactAssistButton from "../../components/custom/button";
import ImpactAssistTextInput from "../../components/custom/text-input";
import { CustomTheme } from "../../theme/theme";
import { login } from "../../utils/login";
import { RoleContext } from "../_layout";

interface LoginFormData {
  email: string;
  password: string;
}

export default function AuthorizationPage() {
  const { changeRole } = useContext(RoleContext);
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const {
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();
  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) {
        setAuthorized(true);
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const getError = (path: keyof LoginFormData) => get(errors, path)?.message;

  if (authorized) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View
      style={{ flex: 1, padding: 20, backgroundColor: theme.colors.background }}
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
          {t("Login")}
        </Text>
      </View>
      <View
        style={{
          gap: 16,
          marginTop: 40,
        }}
      >
        <Controller
          control={control}
          name={"email"}
          render={({ field: { value } }) => (
            <View>
              <ImpactAssistTextInput
                label={t("Email")}
                value={value}
                onChangeText={(text) => {
                  setValue("email", text);
                }}
                onPress={() => {}}
              />
              <HelperText visible={!!getError("email") || true} type="error">
                {getError("email")}
              </HelperText>
            </View>
          )}
          rules={{
            required: t("This field is required"),
            minLength: {
              value: 5,
              message: t("Email must be at least 5 characters long"),
            },
            maxLength: {
              value: 100,
              message: t("Email must be at most 100 characters long"),
            },
          }}
        />
        <Controller
          control={control}
          name={"password"}
          render={({ field: { value } }) => (
            <View>
              <ImpactAssistTextInput
                label={t("Password")}
                secureTextEntry={true}
                value={value}
                onChangeText={(text) => {
                  setValue("password", text);
                }}
                onPress={() => {}}
              />
              <HelperText visible={!!getError("password") || true} type="error">
                {getError("password")}
              </HelperText>
            </View>
          )}
          rules={{
            required: t("This field is required"),
            minLength: {
              value: 5,
              message: t("Email must be at least 5 characters long"),
            },
            maxLength: {
              value: 100,
              message: t("Email must be at most 100 characters long"),
            },
          }}
        />
        <ImpactAssistButton
          label={checkingAuth || loggingIn ? <ActivityIndicator /> : t("Login")}
          onPress={handleSubmit(async (data) => {
            setLoggingIn(true);
            const response = await login(data);
            if (!response.accessToken) {
              setLoggingIn(false);
              Alert.alert(t("Invalid credentials!"));
              return;
            }
            await SecureStore.setItemAsync("accessToken", response.accessToken);
            await SecureStore.setItemAsync(
              "refreshToken",
              response.refreshToken
            );
            changeRole(response.role);
            router.replace("/(tabs)");
          })}
        />
      </View>
    </View>
  );
}

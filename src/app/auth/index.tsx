import { Redirect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { Controller, get, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ActivityIndicator, HelperText, useTheme } from "react-native-paper";
import ImpactAssistButton from "../../components/custom/button";
import ImpactAssistTextInput from "../../components/custom/text-input";
import { CustomTheme } from "../../theme/theme";
import { login } from "../../utils/login";
import { register } from "../../utils/register";
import { RoleContext } from "../_layout";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  email: string;
  fullName: string;
  password: string;
  phone: string;
  confirmPassword: string;
}

export default function AuthorizationPage() {
  const { changeRole } = useContext(RoleContext);
  const [isLogin, setIsLogin] = useState(true);
  const [registrationError, setRegistrationError] = useState("");
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
  const registerForm = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      phone: "",
      confirmPassword: "",
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
  const getRegistrationError = (path: keyof RegisterFormData) =>
    get(registerForm.formState.errors, path)?.message;

  if (authorized) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View
      style={{ flex: 1, padding: 20, backgroundColor: theme.colors.background }}
    >
      {isLogin ? (
        <KeyboardAwareScrollView>
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
                  <HelperText visible={!!getError("email")} type="error">
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
                  <HelperText visible={!!getError("password")} type="error">
                    {getError("password")}
                  </HelperText>
                </View>
              )}
              rules={{
                required: t("This field is required"),
                minLength: {
                  value: 5,
                  message: t("Password must be at least 8 characters long"),
                },
                maxLength: {
                  value: 100,
                  message: t("Password must be at most 100 characters long"),
                },
              }}
            />
            <ImpactAssistButton
              label={
                checkingAuth || loggingIn ? <ActivityIndicator /> : t("Login")
              }
              onPress={handleSubmit(async (data) => {
                setLoggingIn(true);
                const response = await login(data);
                if (!response.accessToken) {
                  setLoggingIn(false);
                  Alert.alert(t("Invalid credentials!"));
                  return;
                }
                await SecureStore.setItemAsync(
                  "accessToken",
                  response.accessToken
                );
                await SecureStore.setItemAsync(
                  "refreshToken",
                  response.refreshToken
                );
                changeRole(response.role);
                router.replace("/(tabs)");
              })}
            />
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <KeyboardAwareScrollView>
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
              {t("Register")}
            </Text>
          </View>
          <View
            style={{
              gap: 16,
              marginTop: 40,
            }}
          >
            <Controller
              control={registerForm.control}
              name={"fullName"}
              render={({ field: { value } }) => (
                <View>
                  <ImpactAssistTextInput
                    label={t("Full Name")}
                    value={value}
                    onChangeText={(text) => {
                      registerForm.setValue("fullName", text);
                    }}
                    onPress={() => {}}
                  />
                  <HelperText
                    visible={!!getRegistrationError("fullName")}
                    type="error"
                  >
                    {getRegistrationError("fullName")}
                  </HelperText>
                </View>
              )}
              rules={{
                required: t("This field is required"),
                minLength: {
                  value: 5,
                  message: t("Full name must be at least 5 characters long"),
                },
                maxLength: {
                  value: 100,
                  message: t("Full name must be at most 100 characters long"),
                },
              }}
            />
            <Controller
              control={registerForm.control}
              name={"email"}
              render={({ field: { value } }) => (
                <View>
                  <ImpactAssistTextInput
                    label={t("Email")}
                    value={value}
                    onChangeText={(text) => {
                      registerForm.setValue("email", text);
                    }}
                    onPress={() => {}}
                  />
                  <HelperText
                    visible={!!getRegistrationError("email")}
                    type="error"
                  >
                    {getRegistrationError("email")}
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
              control={registerForm.control}
              name={"password"}
              render={({ field: { value } }) => (
                <View>
                  <ImpactAssistTextInput
                    label={t("Password")}
                    secureTextEntry={true}
                    value={value}
                    onChangeText={(text) => {
                      registerForm.setValue("password", text);
                    }}
                    onPress={() => {}}
                  />
                  <HelperText
                    visible={!!getRegistrationError("password")}
                    type="error"
                  >
                    {getRegistrationError("password")}
                  </HelperText>
                </View>
              )}
              rules={{
                required: t("This field is required"),
                minLength: {
                  value: 8,
                  message: t("Password must be at least 8 characters long"),
                },
                maxLength: {
                  value: 100,
                  message: t("Password must be at most 100 characters long"),
                },
              }}
            />
            <Controller
              control={registerForm.control}
              name={"confirmPassword"}
              render={({ field: { value } }) => (
                <View>
                  <ImpactAssistTextInput
                    label={t("Confirm Password")}
                    secureTextEntry={true}
                    value={value}
                    onChangeText={(text) => {
                      registerForm.setValue("confirmPassword", text);
                    }}
                    onPress={() => {}}
                  />
                  <HelperText
                    visible={!!getRegistrationError("confirmPassword")}
                    type="error"
                  >
                    {getRegistrationError("password")}
                  </HelperText>
                </View>
              )}
              rules={{
                required: t("This field is required"),
                minLength: {
                  value: 8,
                  message: t("Password must be at least 8 characters long"),
                },
                maxLength: {
                  value: 100,
                  message: t("Password must be at most 100 characters long"),
                },
              }}
            />
            <Controller
              control={registerForm.control}
              name={"phone"}
              render={({ field: { value } }) => (
                <View>
                  <ImpactAssistTextInput
                    label={t("Phone")}
                    value={value}
                    onChangeText={(text) => {
                      registerForm.setValue("phone", text);
                    }}
                    onPress={() => {}}
                  />
                  <HelperText
                    visible={!!getRegistrationError("phone")}
                    type="error"
                  >
                    {getRegistrationError("phone")}
                  </HelperText>
                </View>
              )}
              rules={{
                required: t("This field is required"),
                minLength: {
                  value: 5,
                  message: t("Phone must be at least 5 characters long"),
                },
                maxLength: {
                  value: 100,
                  message: t("Phone must be at most 100 characters long"),
                },
              }}
            />
            <HelperText visible={registrationError.length > 0} type="error">
              {registrationError}
            </HelperText>
            <ImpactAssistButton
              label={
                checkingAuth || loggingIn ? (
                  <ActivityIndicator />
                ) : (
                  t("Register")
                )
              }
              onPress={registerForm.handleSubmit(async (data) => {
                if (data.password !== data.confirmPassword) {
                  setRegistrationError(t("Passwords do not match"));
                  return;
                }
                setRegistrationError("");
                setLoggingIn(true);
                const response = await register(data);
                setLoggingIn(false);
                if (response === -1) Alert.alert(t("Bad request"));
                else Alert.alert(t("User created successfully"));
                return;
              })}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
      <ImpactAssistButton
        style={{ marginTop: 16 }}
        label={t(isLogin ? "Change to Register" : "Change to Login")}
        onPress={() => {
          setIsLogin(!isLogin);
        }}
      />
    </View>
  );
}

import { fireEvent } from "@testing-library/react-native";
import {
  act,
  renderRouter,
  screen,
  waitFor,
} from "expo-router/testing-library";
import AuthorizationPage from "../src/app/auth/index";
import RootPage from "../src/app/index";

jest.mock("react-native-keyboard-controller", () => {
  const R = jest.requireActual("react-native");
  return {
    Keyboard: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    KeyboardAwareScrollView: R.ScrollView,
  };
});

it("renders the root screen", async () => {
  renderRouter(
    {
      index: RootPage,
      auth: AuthorizationPage,
    },
    { initialUrl: "/" }
  );

  await waitFor(() => {
    expect(screen).toHavePathname("/auth");
    expect(screen.getByText("Login")).toBeTruthy();
  });
});

it("changes registration", async () => {
  renderRouter(
    {
      index: RootPage,
      auth: AuthorizationPage,
    },
    { initialUrl: "/" }
  );

  act(() => {
    fireEvent.press(screen.getByText("Change to Register"));
    expect(screen.getByText("Register")).toBeTruthy();
  });
});

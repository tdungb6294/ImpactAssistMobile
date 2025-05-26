import { createContext, Dispatch, SetStateAction } from "react";
import { NativeSyntheticEvent, NativeTouchEvent } from "react-native";

export const ClaimTabContext = createContext<{
  isInputNearBottom: boolean;
  setIsInputNearBottom: Dispatch<SetStateAction<boolean>>;
  handleTapOnInput: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
}>({
  isInputNearBottom: false,
  setIsInputNearBottom: () => {},
  handleTapOnInput: () => {},
});

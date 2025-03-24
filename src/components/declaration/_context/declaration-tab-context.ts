import { createContext, Dispatch, SetStateAction } from "react";

export const DeclarationTabContext = createContext<{
  isInputNearBottom: boolean;
  setIsInputNearBottom: Dispatch<SetStateAction<boolean>>;
}>({
  isInputNearBottom: false,
  setIsInputNearBottom: () => {},
});

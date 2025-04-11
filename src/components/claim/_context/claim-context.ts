import { createContext } from "react";
import {
  Control,
  FormState,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Claim } from "../../../model/claim";

type ClaimContextType = {
  setValue: UseFormSetValue<Claim>;
  handleSubmit: UseFormHandleSubmit<Claim, Claim>;
  control: Control<Claim, any, Claim>;
  formState: FormState<Claim>;
  watch: UseFormWatch<Claim>;
};

export const ClaimContext = createContext<ClaimContextType>({
  setValue: () => {},
  handleSubmit: () => async () => Promise.resolve(),
  control: {} as Control<Claim, any, Claim>,
  formState: {} as FormState<Claim>,
  watch: (() => ({} as Claim)) as UseFormWatch<Claim>,
});

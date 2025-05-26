import * as DocumentPicker from "expo-document-picker";
import { createContext, Dispatch, SetStateAction } from "react";
import {
  Control,
  FormState,
  UseFormHandleSubmit,
  UseFormSetError,
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
  setDocuments: Dispatch<
    SetStateAction<DocumentPicker.DocumentPickerResult | null>
  >;
  setImages: Dispatch<
    SetStateAction<DocumentPicker.DocumentPickerResult | null>
  >;
  documents: DocumentPicker.DocumentPickerResult | null;
  images: DocumentPicker.DocumentPickerResult | null;
  setError: UseFormSetError<Claim>;
};

export const ClaimContext = createContext<ClaimContextType>({
  setValue: () => {},
  handleSubmit: () => async () => Promise.resolve(),
  control: {} as Control<Claim, any, Claim>,
  formState: {} as FormState<Claim>,
  watch: (() => ({} as Claim)) as UseFormWatch<Claim>,
  setDocuments: () => {},
  setImages: () => {},
  documents: null,
  images: null,
  setError: () => {},
});

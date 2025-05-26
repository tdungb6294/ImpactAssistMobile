import { axios } from "../lib/axios";
import { DeclarationFieldErrors } from "../model/declaration-field-errors";
import { ErrorResponse } from "../model/error-response";

export const createDeclaration = async (
  formData: FormData
): Promise<Uint8Array | ErrorResponse<DeclarationFieldErrors>> => {
  try {
    const response = await axios.post("/declaration", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
      transformRequest: (data) => data,
    });
    const byteArrayBuffer: ArrayBuffer = response.data as ArrayBuffer;
    const byteArray = new Uint8Array(byteArrayBuffer);
    return byteArray;
  } catch (error: any) {
    return {
      message: error?.response?.data?.message || "Unknown error",
      errors: error?.response?.data?.errors as DeclarationFieldErrors,
    };
  }
};

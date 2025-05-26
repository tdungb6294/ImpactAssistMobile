import { axios } from "../lib/axios";

export const createDeclaration = async (
  formData: FormData
): Promise<Uint8Array> => {
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
  } catch (error) {
    console.error("Error creating declaration:", error);
    throw new Error("Doesn't work");
  }
};

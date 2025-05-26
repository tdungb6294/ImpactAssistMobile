import { axios } from "../lib/axios";

export const createCompensation = async (
  reportId: number,
  compensationAmount: number
): Promise<Uint8Array> => {
  const response = await axios.post(
    `/compensation`,
    {
      reportId,
      compensationAmount,
    },
    {
      responseType: "arraybuffer",
    }
  );
  const byteArrayBuffer: ArrayBuffer = response.data as ArrayBuffer;
  const byteArray = new Uint8Array(byteArrayBuffer);
  return byteArray;
};

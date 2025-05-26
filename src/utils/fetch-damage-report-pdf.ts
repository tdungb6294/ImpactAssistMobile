import { axios } from "../lib/axios";

export const fetchDamageReportPDF = async (id: number): Promise<Uint8Array> => {
  const response = await axios.get(`/damage-report/generate-pdf/${id}`, {
    responseType: "arraybuffer",
  });
  const byteArrayBuffer: ArrayBuffer = response.data as ArrayBuffer;
  const byteArray = new Uint8Array(byteArrayBuffer);
  return byteArray;
};

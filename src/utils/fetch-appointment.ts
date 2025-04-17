import { axios } from "../lib/axios";
import { Appointment } from "../model/appointment";

export const fetchAppointment = async (id: number): Promise<Appointment> => {
  const response = await axios.get(`/appointment/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};

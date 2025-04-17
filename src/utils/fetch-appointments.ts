import { axios } from "../lib/axios";
import { Appointment } from "../model/appointment";

export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await axios.get("/appointment", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data as Appointment[];
  } catch (error) {
    console.error("Error fetching claims:", error);
    return [];
  }
};

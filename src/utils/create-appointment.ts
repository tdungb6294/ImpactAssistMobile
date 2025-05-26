import { axios } from "../lib/axios";

export interface RegisterAppointment {
  expertAvailabilityId: number;
  appointmentDate: string;
  title: string;
  description: string;
}

export const createAppointment = async (
  appointment: RegisterAppointment
): Promise<number> => {
  console.log("Creating appointment with data:", appointment);
  try {
    const response = await axios.post(
      "/appointment",
      { ...appointment },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data as number;
  } catch (e) {
    console.error("Error creating appointment:", e);
    return -1;
  }
};

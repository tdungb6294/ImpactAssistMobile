import { axios } from "../lib/axios";
import { Appointment } from "../model/appointment";

export interface PartialAppointmentPage {
  total: number;
  appointments: Appointment[];
  currentPage: number;
  totalPages: number | null;
  totalCount: number;
  nextPage: number | null;
}

export const fetchAppointments = async ({
  pageParam,
}: {
  pageParam: any;
}): Promise<PartialAppointmentPage> => {
  const response = await axios.get(`/appointment?page=${pageParam}&size=6`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};

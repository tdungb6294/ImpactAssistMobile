import { AppointmentStatus } from "./enum/appointment-status";

export interface Appointment {
  id: number;
  title: string;
  description: string;
  date: Date;
  availabilityId: number;
  userId: number;
  appointmentStatus: AppointmentStatus;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  longitude: number;
  latitude: number;
  fullName: string;
}

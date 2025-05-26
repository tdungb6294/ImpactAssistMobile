export interface Slot {
  id: number;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
}

export interface UnavailableSlot {
  date: Date;
  availabilityId: number;
}

export interface LocalExpertAvailability {
  slots: Slot[];
  unavailableSlots: UnavailableSlot[];
}

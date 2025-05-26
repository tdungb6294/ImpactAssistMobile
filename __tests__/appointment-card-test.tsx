import { render } from "@testing-library/react-native";

import React from "react";
import AppointmentCard from "../src/components/appointment/appointment-card";
import { AppointmentStatus } from "../src/model/enum/appointment-status";

describe("AppointmentCard", () => {
  test("renders correctly", () => {
    const { getByText } = render(
      <AppointmentCard
        appointment={{
          id: 1,
          title: "Test Appointment",
          date: new Date("2025-01-01T00:10:00"),
          startTime: "10:00",
          endTime: "11:00",
          appointmentStatus: AppointmentStatus.ANALYZING,
          availabilityId: 1,
          userId: 1,
          longitude: 0,
          latitude: 0,
          fullName: "John Doe",
          description: "Test Description",
          dayOfWeek: "Monday",
        }}
      />
    );
    getByText("2025-01-01");
  });
});

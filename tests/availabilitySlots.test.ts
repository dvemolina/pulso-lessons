import { generateAvailabilitySlots, generateDailySlots, prepareSlotsToInsert } from "$src/features/Availability/lib/utils";
import { describe, it, expect } from "vitest";


describe("Slots Generation Functions", () => {
  it("should generate hourly slots between given times", () => {
    const dayStart = "09:00";
    const dayEnd = "12:00";
    const slots = generateDailySlots(dayStart, dayEnd);

    console.log('Generated Slots: ', slots)
    expect(slots).toEqual([
      { slotStart: "09:00", slotEnd: "10:00" },
      { slotStart: "10:00", slotEnd: "11:00" },
      { slotStart: "11:00", slotEnd: "12:00" },
    ]);
  });

  it("should generate all slots for valid weekdays within a date range", () => {
    const availability = {
      seasonStart: "2024-01-01",
      seasonEnd: "2024-01-07",
      dayStart: "09:00",
      dayEnd: "12:00",
      weekDays: [1, 3, 5], // Monday, Wednesday, Friday
    };

    const slots = generateAvailabilitySlots(availability);

    // Check a subset of the results to ensure they are correct
    expect(slots).toContainEqual({
      date: "2024-01-01",
      slotStart: "09:00",
      slotEnd: "10:00",
    });
    expect(slots).toContainEqual({
      date: "2024-01-03",
      slotStart: "11:00",
      slotEnd: "12:00",
    });
  });

  it("should prepare slots for insertion with a default status", () => {
    const slots = [
      { date: "2024-01-01", slotStart: "09:00", slotEnd: "10:00" },
      { date: "2024-01-01", slotStart: "10:00", slotEnd: "11:00" },
    ];

    const availabilityId = 1;
    const slotsToInsert = prepareSlotsToInsert(availabilityId, slots);

    expect(slotsToInsert).toEqual([
      {
        availabilityId: 1,
        date: "2024-01-01",
        slotStart: "09:00",
        slotEnd: "10:00",
        statusId: 1,
      },
      {
        availabilityId: 1,
        date: "2024-01-01",
        slotStart: "10:00",
        slotEnd: "11:00",
        statusId: 1,
      },
    ]);
  });
});

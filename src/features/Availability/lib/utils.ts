import { eachDayOfInterval, format, parse } from "date-fns";

export function generateDailySlots(dayStart: string, dayEnd: string): { slotStart: string; slotEnd: string }[] {
    const slots: { slotStart: string; slotEnd: string }[] = [];
    let currentTime = parse(dayStart, "HH:mm", new Date());
    const endTime = parse(dayEnd, "HH:mm", new Date());

    while (currentTime < endTime) {
        const nextTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Add 1 hour
        if (nextTime <= endTime) {
            slots.push({
                slotStart: format(currentTime, "HH:mm"),
                slotEnd: format(nextTime, "HH:mm"),
            });
        }
        currentTime = nextTime;
    }

    return slots;
}

export function generateAllSlots(availability: {seasonStart: string, seasonEnd: string, dayStart: string, dayEnd: string, weekDays: number[];}) {
    const { seasonStart, seasonEnd, dayStart, dayEnd, weekDays } = availability;

    // Generate all dates within the season range
    const startDate = parse(seasonStart, "yyyy-MM-dd", new Date());
    const endDate = parse(seasonEnd, "yyyy-MM-dd", new Date());
    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    // Filter dates to match specified weekdays
    const validDates = dates.filter(date => weekDays.includes(date.getDay()));

    // Generate slots for each valid date
    const allSlots: { slotStart: string; slotEnd: string; date: string; }[] = [];
    for (const date of validDates) {
        const dailySlots = generateDailySlots(dayStart, dayEnd);
        dailySlots.forEach(slot => {
            allSlots.push({
                date: format(date, "yyyy-MM-dd"),
                ...slot,
            });
        });
    }

    return allSlots;
}

export function prepareSlotsToInsert(availabilityId: number, slots: { date: string; slotStart: string; slotEnd: string }[]) {
    const slotsToInsert = slots.map(slot => ({
        availabilityId,
        date: slot.date,
        slotStart: slot.slotStart,
        slotEnd: slot.slotEnd,
        statusId: 1, // Default to "free"
    }));

    return slotsToInsert

}

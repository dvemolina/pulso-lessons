import type { RequestEvent } from "@sveltejs/kit"

export function handleLoginRedirect(event: RequestEvent, message: string = "Accede a tu cuenta para visitar esta página") {
    const redirectTo = event.url.pathname + event.url.search;
    return `/login?redirectTo=${redirectTo}&redirectMessage=${message}`
}

export function generateTimeOptions(startTime: string, endTime: string, intervalMinutes: number): {label: string, value: string}[] {
    const options = [];
    console.log(startTime)
    let [startHour, startMinute ] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    while (startHour < endHour || (startHour === endHour && startMinute <= endMinute)) {
        const timeString = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
        options.push({label: timeString, value: timeString})

        startMinute += intervalMinutes;
        if (startMinute >= 60) {
            startMinute -= 60;
            startHour++;
        }
    }
    return options;
}

export function parsePhoneNumber(phoneString: string): {prefix: string, number: number} {
    // Use a regular expression to extract the prefix and the number
    const match = phoneString.match(/^(\+\d+)-(\d+)$/);

    if (!match) {
        throw new Error("Invalid phone number format");
    }

    const [, prefix, numberString] = match;

    return {
        prefix,
        number: parseInt(numberString, 10) // Convert the number to an integer
    };
}


export const countryPrefix = [
    { value: "+1", label: "+1 - United States" },
    { value: "+44", label: "+44 - United Kingdom" },
    { value: "+33", label: "+33 - France" },
    { value: "+49", label: "+49 - Germany" },
    { value: "+61", label: "+61 - Australia" },
    { value: "+91", label: "+91 - India" },
    { value: "+81", label: "+81 - Japan" },
    { value: "+86", label: "+86 - China" },
    { value: "+55", label: "+55 - Brazil" },
    { value: "+39", label: "+39 - Italy" },
    { value: "+34", label: "+34 - Spain" },
    { value: "+7", label: "+7 - Russia" },
    { value: "+62", label: "+62 - Indonesia" },
    { value: "+52", label: "+52 - Mexico" },
    { value: "+27", label: "+27 - South Africa" },
    { value: "+82", label: "+82 - South Korea" },
    { value: "+60", label: "+60 - Malaysia" },
    { value: "+63", label: "+63 - Philippines" },
    { value: "+64", label: "+64 - New Zealand" },
    { value: "+31", label: "+31 - Netherlands" },
    { value: "+46", label: "+46 - Sweden" },
    { value: "+47", label: "+47 - Norway" },
    { value: "+45", label: "+45 - Denmark" },
    { value: "+41", label: "+41 - Switzerland" },
    { value: "+351", label: "+351 - Portugal" },
    { value: "+90", label: "+90 - Turkey" },
    { value: "+48", label: "+48 - Poland" },
    { value: "+420", label: "+420 - Czech Republic" },
    { value: "+43", label: "+43 - Austria" },
    { value: "+32", label: "+32 - Belgium" },
    { value: "+30", label: "+30 - Greece" },
    { value: "+372", label: "+372 - Estonia" },
    { value: "+371", label: "+371 - Latvia" },
    { value: "+370", label: "+370 - Lithuania" },
    { value: "+386", label: "+386 - Slovenia" },
    { value: "+421", label: "+421 - Slovakia" },
    { value: "+385", label: "+385 - Croatia" },
    { value: "+356", label: "+356 - Malta" },
];

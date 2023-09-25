import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export function localeDate(timestamp, locale) {
    const zonedTimestamp = utcToZonedTime(timestamp, locale);
    const d = new Date(zonedTimestamp.getFullYear(), zonedTimestamp.getMonth(), zonedTimestamp.getDate(), 0, 0);
    return zonedTimeToUtc(d, locale);
}

export function weekdayToString(weekday) {
    switch (weekday) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return 'UNKNOWN WEEKDAY';
    }
}

/**
 * Open/closed is evaluated in America/Los_Angeles, not the viewer's zone.
 * A day is open from its start time inclusive through its close time exclusive.
 */

const TIME_ZONE = "America/Los_Angeles";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

/** Minutes from midnight, Pacific, through the close minute (exclusive). */
const OPEN_MINUTES: Record<Weekday, readonly [number, number] | null> = {
  Monday: [9 * 60, 18 * 60],
  Tuesday: [9 * 60, 18 * 60],
  Wednesday: [9 * 60, 18 * 60],
  Thursday: [9 * 60, 18 * 60],
  Friday: [9 * 60, 18 * 60],
  Saturday: [9 * 60, 14 * 60],
  Sunday: null,
};

export type LaClock = {
  weekday: Weekday;
  minutes: number;
};

export function laClock(date: Date): LaClock | null {
  if (Number.isNaN(date.getTime())) return null;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hourRaw = parts.find((part) => part.type === "hour")?.value;
  const minuteRaw = parts.find((part) => part.type === "minute")?.value;
  if (!weekday || hourRaw == null || minuteRaw == null) return null;
  if (!WEEKDAYS.includes(weekday as Weekday)) return null;

  let hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  if (hour === 24) hour = 0;

  return { weekday: weekday as Weekday, minutes: hour * 60 + minute };
}

export function weekdayInLa(date: Date): Weekday | null {
  return laClock(date)?.weekday ?? null;
}

export function isOpenAt(date: Date): boolean {
  const clock = laClock(date);
  if (!clock) return false;
  const range = OPEN_MINUTES[clock.weekday];
  if (!range) return false;
  return clock.minutes >= range[0] && clock.minutes < range[1];
}

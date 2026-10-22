import assert from "node:assert/strict";
import { test } from "node:test";
import { isOpenAt, weekdayInLa } from "./hours.ts";

/** Pacific wall time as a UTC instant. Offset is -7 in October and -8 in January. */
function pacific(isoLocal: string, offset: "-07:00" | "-08:00"): Date {
  return new Date(`${isoLocal}${offset}`);
}

test("Thursday afternoon in October (PDT) is open", () => {
  const date = pacific("2026-10-22T14:58:00", "-07:00");
  assert.equal(weekdayInLa(date), "Thursday");
  assert.equal(isOpenAt(date), true);
});

test("weekday boundaries are inclusive at open and exclusive at close", () => {
  assert.equal(isOpenAt(pacific("2026-10-22T08:59:00", "-07:00")), false);
  assert.equal(isOpenAt(pacific("2026-10-22T09:00:00", "-07:00")), true);
  assert.equal(isOpenAt(pacific("2026-10-22T17:59:00", "-07:00")), true);
  assert.equal(isOpenAt(pacific("2026-10-22T18:00:00", "-07:00")), false);
});

test("Friday is a weekday and Sunday is closed", () => {
  assert.equal(isOpenAt(pacific("2026-10-23T12:00:00", "-07:00")), true);
  assert.equal(weekdayInLa(pacific("2026-10-25T12:00:00", "-07:00")), "Sunday");
  assert.equal(isOpenAt(pacific("2026-10-25T12:00:00", "-07:00")), false);
});

test("Saturday closes at 2:00 p.m. Pacific", () => {
  assert.equal(isOpenAt(pacific("2026-10-24T09:00:00", "-07:00")), true);
  assert.equal(isOpenAt(pacific("2026-10-24T13:59:00", "-07:00")), true);
  assert.equal(isOpenAt(pacific("2026-10-24T14:00:00", "-07:00")), false);
});

test("standard time in January uses Pacific, not the machine zone", () => {
  const morning = pacific("2027-01-06T09:00:00", "-08:00");
  const close = pacific("2027-01-06T18:00:00", "-08:00");
  assert.equal(weekdayInLa(morning), "Wednesday");
  assert.equal(isOpenAt(morning), true);
  assert.equal(isOpenAt(close), false);
});

test("an invalid date is not reported as open", () => {
  assert.equal(isOpenAt(new Date("not-a-date")), false);
  assert.equal(weekdayInLa(new Date("not-a-date")), null);
});

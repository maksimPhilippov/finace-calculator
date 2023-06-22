import { Active } from "../types/Active";
import { PeriodSheme } from "../types/PeriodSheme";

const milisecondsInDay = 1000 * 60 * 60 * 24;
const milisecondsInWeek = milisecondsInDay * 7;

function periodDifference(day: Date, beginnigDate: Date, periodValue: number) {
  let period: number = day.getTime() - beginnigDate.getTime();
  period -= period % milisecondsInWeek;
  period /= milisecondsInWeek;
  return period;
}

function weekDifference(day: Date, beginnigDate: Date) {
  return periodDifference(day, beginnigDate, milisecondsInWeek);
}

function dayDifference(day: Date, beginnigDate: Date) {
  return periodDifference(day, beginnigDate, milisecondsInDay);
}

function monthDifference(day: Date, beginnigDate: Date) {
  let months: number;
  months = (day.getFullYear() - beginnigDate.getFullYear()) * 12;
  months += beginnigDate.getMonth() - day.getMonth();
  return months;
}

function yearDifference(day: Date, beginnigDate: Date) {
  return day.getFullYear() - beginnigDate.getFullYear();
}

export function isIncomeDay(active: Active, day: Date) {
  let period: number = 0;
  switch (active.inputs.regularity) {
    case PeriodSheme.byDays:
      period = dayDifference(day, active.inputs.beginnigDate);
      break;
    case PeriodSheme.byWeeks:
      period = weekDifference(day, active.inputs.beginnigDate);
      break;
    case PeriodSheme.byMonths:
      period = monthDifference(day, active.inputs.beginnigDate);
      break;
    case PeriodSheme.byYears:
      period = yearDifference(day, active.inputs.beginnigDate);
      break;
  }

  return period % active.inputs.frequency === 0 ? true : false;
}

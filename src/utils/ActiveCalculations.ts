import { MoneyAction } from "../types/MoneyAction";
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

export function isMoneyActionGain(active: MoneyAction, day: Date) {
  let period: number = 0;
  switch (active.regularity) {
    case PeriodSheme.byDays:
      period = dayDifference(day, active.beginnigDate);
      break;
    case PeriodSheme.byWeeks:
      period = weekDifference(day, active.beginnigDate);
      break;
    case PeriodSheme.byMonths:
      period = monthDifference(day, active.beginnigDate);
      break;
    case PeriodSheme.byYears:
      period = yearDifference(day, active.beginnigDate);
      break;
  }

  return period % active.frequency === 0 ? true : false;
}

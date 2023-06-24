import { MoneyAction } from "../types/MoneyAction";
import { PeriodSheme } from "../types/PeriodSheme";
import { periodReportType } from "../types/PeriodReport";
import { act } from "react-dom/test-utils";

export const milisecondsInDay = 1000 * 60 * 60 * 24;
const milisecondsInWeek = milisecondsInDay * 7;

function periodDifference(day: Date, beginnigDate: Date, periodValue: number) {
  let period: number = day.getTime() - beginnigDate.getTime();
  period -= period % periodValue;
  period /= periodValue;
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
    case PeriodSheme["by days"]:
      period = dayDifference(day, active.beginnigDate);
      break;
    case PeriodSheme["by weeks"]:
      if (day.getDay() === active.beginnigDate.getDay()) {
        period = weekDifference(day, active.beginnigDate);
      } else {
        return false;
      }
      break;
    case PeriodSheme["by months"]:
      if (day.getDate() === active.beginnigDate.getDate()) {
        period = monthDifference(day, active.beginnigDate);
      } else {
        return false;
      }
      break;
    case PeriodSheme["by years"]:
      if (
        day.getDate() === active.beginnigDate.getDate() &&
        day.getMonth() === active.beginnigDate.getMonth()
      ) {
        period = yearDifference(day, active.beginnigDate);
      } else {
        return false;
      }
      break;
  }
  let result = period % active.frequency === 0 ? true : false;
  // period > 0 ? (period % active.frequency === 0 ? true : false) : false;
  return result;
}

export function MoneyActionImpact(
  action: MoneyAction,
  startDate: Date,
  endDate: Date
) {
  let cash = 0;
  let capital = 0;
  let report: periodReportType = [];

  for (
    let day = new Date(startDate);
    day.getTime() < endDate.getTime();
    day.setTime(day.getTime() + milisecondsInDay)
  ) {
    // console.log(day);
    // console.log(action.beginnigDate);
    if (day.getTime() === action.beginnigDate.getTime()) {
      // console.log("yea");
      cash = -action.investment;
      capital = action.investment;
    }
    if (isMoneyActionGain(action, day)) {
      let income = 0;
      if (action.isPercentageIncome) {
        income = capital * (action.IncomeValue / 100);
      } else {
        income = action.IncomeValue;
      }
      // console.log(day, income);
      if (action.isIncomeIncrementsInvenstment) {
        capital += income;
      } else {
        cash += income;
      }
    }
    report.push([new Date(day), cash, capital]);
  }
  // console.log(report);
  return report;
}

//   let investmentInTime = 0;
//   let cash =
//     startDate.getTime() < action.beginnigDate.getTime() ? 0 : action.investment;
//   let periodReport: periodReportType = [];

//   for (
//     let day = new Date(startDate);
//     day.getTime() < endDate.getTime();
//     day.setTime(day.getTime() + milisecondsInDay)
//   ) {
//     if (day.getTime() == action.beginnigDate.getTime()) {
//       cash = -action.investment;
//       investmentInTime = action.investment;
//     }

//     if (isMoneyActionGain(action, day)) {
//       let income = 0;
//       if (action.isPercentageIncome) {
//         income = (investmentInTime * action.IncomeValue) / 100;
//       } else {
//         income = action.IncomeValue;
//       }

//       if (action.isIncomeIncrementsInvenstment) {
//         investmentInTime += income;
//       } else {
//         cash += income;
//       }
//       periodReport.push([new Date(day), cash, investmentInTime]);
//     }
//   }

//   return periodReport;
// }

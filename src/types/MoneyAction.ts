import { PeriodSheme } from "./PeriodSheme";

export interface MoneyAction {
  investment: number;
  beginnigDate: Date;
  regularity: PeriodSheme;
  frequency: number;

  isPercentageIncome: boolean;
  isIncomeIncrementsInvenstment: boolean;
  IncomeValue: number;
}

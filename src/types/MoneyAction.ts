import { PeriodSheme } from "./PeriodSheme";

export interface MoneyAction {
  name: string;
  id: number;

  investment: number;
  beginnigDate: Date;
  regularity: PeriodSheme;
  frequency: number;

  isPercentageIncome: boolean;
  isIncomeIncrementsInvenstment: boolean;
  isActive: boolean;
  IncomeValue: number;
}

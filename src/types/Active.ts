import { PeriodSheme } from "./PeriodSheme";

export interface Active {
  inputs: {
    investment: number;
    beginnigDate: Date;
    regularity: PeriodSheme;
    frequency: number;

    isPercentageIncome: boolean;
    isIncomeIncrementsInvenstment: boolean;
    IncomeValue: number;
  };
  outputs: {
    profitability: number;
    payback: Date;
  };
}

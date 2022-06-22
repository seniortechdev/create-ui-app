export interface State {
  id: string;
  key: string;
  slug: string;
  name: string;
}

export interface Measure {
  ['Thousands Of Tons']: number;
  ['Millions Of Dollars']: number;
  ['Destination State']: number;
}

export interface InterstateTrade {
  state: State;
  totalDollars: number;
  totalTons: number;
  top5InTermsOfDollars: Measure[];
  top5InTermsOfTons: Measure[];
}

export interface IndustryByAverageSalarySummary {
  averageSalary: string;
  industry: string;
}

export interface IndustryByEmployeeSummary {
  employedCount: string;
  industry: string;
}

export interface EmploymentSummary {
  topIndustryByAverageSalary: IndustryByAverageSalarySummary;
  topIndustryByEmployee: IndustryByEmployeeSummary;
}
export interface InterstateTradeForState {
  amount: number;
  name: string;
}

export interface ProductionSummary {
  productionTypeByDollars: InterstateTradeForState[];
  productionTypeByTons: InterstateTradeForState[];
}

export interface InterstateTradeSummary {
  statesByDollars: InterstateTradeForState[];
  statesByTons: InterstateTradeForState[];
  totalTons: number;
  totalDollarAmount: number;
}

export interface StateEconomyResult {
  name: string;
  employmentSummary: EmploymentSummary;
  productionSummary: ProductionSummary;
  tradeSummary: InterstateTradeSummary;
}

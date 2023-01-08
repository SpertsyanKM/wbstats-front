export type PropertyPerInterval = Record<string, number>;
export type DataPerInterval = {
  sales: PropertyPerInterval;
  orders: PropertyPerInterval;
  returns: PropertyPerInterval;
  deliveryCosts: PropertyPerInterval;
  earnings: PropertyPerInterval;
  returnOutcomes: PropertyPerInterval;
  totalSales: number;
  totalOrders: number;
  totalReturns: number;
  totalDeliveryCosts: number;
  totalEarnings: number;
  totalReturnOutcomes: number;
};

export type FinancialData = {
  earnings: number;
  saleCount: number;
  deliveryCosts: number;
  deliveryCount: number;
  returnOutcomes: number;
  returnCount: number;
  totalEarnings: number;
};

export type FinancialDataWrapper = {
  financialDataPerInterval: Record<string, FinancialData>;
  totals: FinancialData;
  lastReportDate: string | null;
};

export type FinancialDataPerGoodWrapper = {
  financialDataPerInterval: Record<number, FinancialDataWrapper>;
  lastReportDate: string | null;
};

export enum FinancialDataInterval {
  PER_DAY,
  PER_WEEK,
  PER_MONTH
}

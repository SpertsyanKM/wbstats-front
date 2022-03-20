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

export type Good = {
  id: string;
  originSku: string;
  colorSku: string;
  barcode: string;
  nomenclature: string;
  name: string;
};

export type WBStock = {
  supplierArticle: string,
  barcode: string,
  nmId: string,
  quantity: number,
  quantityFull: number,
  quantityNotInOrders: number,
  techSize: string,
  inWayToClient: number,
  inWayFromClient: number,
  requestDate: string
};

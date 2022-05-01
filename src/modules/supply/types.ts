export type Supply = {
  boxes: Box[];
};

export type Box = {
  index: number;
  barcode: string;
  goods: BoxGood[];
}

export type BoxGood = {
  goodId: string;
  count: number;
};

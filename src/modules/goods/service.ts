import {Good, WBStock} from './types';
import {GET, POST_MULTIFORM} from '../../utils/api/core/api';
import {SimpleBooleanResponse} from '../../utils/types/commonTypes';

type GoodsFetcher = () => Promise<Good[]>;
const fetchGoods: GoodsFetcher = async () => {
  return await GET<Good[]>('goods/all');
};

type GoodsEnricher = (file: File) => Promise<SimpleBooleanResponse>;
const enrichGoods: GoodsEnricher = async file => {
  return await POST_MULTIFORM<SimpleBooleanResponse>('goods/enrichFromCsv', file);
};

type WbReportUploader = (file: File) => Promise<SimpleBooleanResponse>;
const uploadWbReport: WbReportUploader = async file => {
  return await POST_MULTIFORM<SimpleBooleanResponse>('goodTransactions/enrichFromWbCsv', file);
};

type OzonReportUploader = (file: File) => Promise<SimpleBooleanResponse>;
const uploadOzonReport: OzonReportUploader = async file => {
  return await POST_MULTIFORM<SimpleBooleanResponse>('goodTransactions/enrichFromOzonCsv', file);
};

type WbStocksFetcher = () => Promise<WBStock[]>;
const fetchWbStocks: WbStocksFetcher = async () => {
  return await GET<WBStock[]>('goods/wbStocks');
}

export const GoodsService = {
  fetchGoods,
  enrichGoods,
  uploadWbReport,
  uploadOzonReport,
  fetchWbStocks,
};

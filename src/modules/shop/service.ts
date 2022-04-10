import {Shop} from './types';
import {POST} from '../../utils/api/core/api';

type ShopRegistrationRequester = (name: string, wbApiKeyV1: string, wbApiKeyV2: string) => Promise<Shop>;

const requestShopRegistration: ShopRegistrationRequester = async (name, wbApiKeyV1, wbApiKeyV2) => {
  return await POST<Shop>('shop/register', {name, wbApiKeyV1, wbApiKeyV2});
};

export const ShopService = {
  requestShopRegistration,
};

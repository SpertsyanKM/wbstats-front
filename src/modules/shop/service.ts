import {Shop} from './types';
import {POST} from '../../utils/api/core/api';

type ShopRegistrationRequester = (name: string) => Promise<Shop>;

const requestShopRegistration: ShopRegistrationRequester = async name => {
  return await POST<Shop>('shop/register', {name});
};

export const ShopService = {
  requestShopRegistration,
};

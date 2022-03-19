import {Good} from './types';

type SkuGetter = (good: Good) => string;
export const getSku: SkuGetter = good => `${good.originSku}${good.colorSku}`;

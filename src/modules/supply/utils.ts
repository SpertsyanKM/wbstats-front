import {Supply} from './types';
import * as XLSX from 'xlsx';
import {Good} from '../goods';
import {WB_BOX_ID_PREFIX} from './constants';

type SupplyToWbOrderXlsxExporter = (supply: Supply, goodsById: Record<string, Good>) => void;
export const exportSupplyToWbOrderXlsx: SupplyToWbOrderXlsxExporter = (supply, goodsById) => {
  const totals: Record<string, number> = {};
  supply.boxes.forEach(box => {
    box.goods.forEach(boxGood => {
      const good = goodsById[boxGood.goodId];
      if (good) {
        if (!totals[good.barcode]) {
          totals[good.barcode] = 0;
        }
        totals[good.barcode] += boxGood.count;
      }
    });
  });
  const aoa = Object.keys(totals).map(key => {
    const count = totals[key];
    return [key, count];
  });
  const data = [["Баркод", "Количество"], ...aoa];

  const sheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet);
  XLSX.writeFileXLSX(workbook, "preorder.xlsx");
};

type SupplyToWbBoxesXlsxExporter = (supply: Supply, goodsById: Record<string, Good>, wbFirstBoxId: number) => void;
export const exportSupplyToWbBoxesXlsx: SupplyToWbBoxesXlsxExporter = (supply, goodsById, wbFirstBoxId) => {
  let data = [["ШК единицы товара", "Кол-во товаров", "Уникальный ШК короба/Палеты", "срок годности", "Если товар с Кизом, заполните – Да"]];
  supply.boxes.forEach(box => {
    const boxBarcode = WB_BOX_ID_PREFIX + wbFirstBoxId.toString();
    box.goods.forEach(boxGood => {
      const good = goodsById[boxGood.goodId];
      if (good) {
        data.push([good.barcode, boxGood.count.toString(), boxBarcode, "", ""]);
      }
    });
    wbFirstBoxId++;
  });

  const sheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet);
  XLSX.writeFileXLSX(workbook, "boxes.xlsx");
};

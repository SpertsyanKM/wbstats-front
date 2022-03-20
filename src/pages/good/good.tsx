import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {selectGoodById} from '../../modules/goods/selectors';
import {GoodAnalyticsService} from '../../modules/goodAnalytics/service';
import {getSku} from '../../modules/goods/utils';
import {DataPerInterval} from '../../modules/goodAnalytics/types';
import Loader from '../../components/common/loader';
import {convertSalesPerIntervalToChart} from './utils';
import {Content, GoodTitle, SectionTitle, StyledChart, StyledTable, TitleRow} from './goodStyles';

type Props = {};

const Good: React.FC<Props> = () => {
  const {id} = useParams();
  const good = useSelector(state => selectGoodById(state, id));
  const [dataPerInterval, setDataPerInterval] = useState<DataPerInterval | null>(null);

  useEffect(() => {
    if (!good) return;

    const today = new Date();
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30);
    GoodAnalyticsService.fetchDataPerInterval(
      getSku(good),
      1,
      startDate,
      today
    ).then(result => setDataPerInterval(result));
  }, [good]);

  console.log(dataPerInterval);
  return (
    <Content>
      <GoodTitle>{good?.name}</GoodTitle>
      {(!good || !dataPerInterval) && <Loader root />}
      {good && dataPerInterval && (
        <>
          <SectionTitle>Продажи по дням за месяц</SectionTitle>
          <StyledChart
            data={convertSalesPerIntervalToChart(
              getSku(good),
              dataPerInterval.sales,
            )}
          />
          <SectionTitle>Статистика</SectionTitle>
          <StyledTable>
            <tbody>
              <TitleRow>
                <td>Начало интервала</td>
                <td>Заказы</td>
                <td>Расходы на доставку</td>
                <td>Продажи</td>
                <td>Доход с продаж</td>
                <td>Возвраты</td>
                <td>Сумма возвратов</td>
              </TitleRow>
              {
                Object.keys(dataPerInterval.sales).map(intervalBeginning => (
                  <tr>
                    <td>{intervalBeginning}</td>
                    <td>{dataPerInterval.orders[intervalBeginning]}</td>
                    <td>{dataPerInterval.deliveryCosts[intervalBeginning]}</td>
                    <td>{dataPerInterval.sales[intervalBeginning]}</td>
                    <td>{dataPerInterval.earnings[intervalBeginning]}</td>
                    <td>{dataPerInterval.returns[intervalBeginning]}</td>
                    <td>{dataPerInterval.returnOutcomes[intervalBeginning]}</td>
                  </tr>
                ))
              }
              <TitleRow>
                <td>Итого:</td>
                <td>{dataPerInterval.totalOrders}</td>
                <td>{dataPerInterval.totalDeliveryCosts}</td>
                <td>{dataPerInterval.totalSales}</td>
                <td>{dataPerInterval.totalEarnings}</td>
                <td>{dataPerInterval.totalReturns}</td>
                <td>{dataPerInterval.totalReturnOutcomes}</td>
              </TitleRow>
            </tbody>
          </StyledTable>
        </>
      )}
    </Content>
  );
};

export default Good;

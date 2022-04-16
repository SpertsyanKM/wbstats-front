import React, {useCallback, useEffect, useState} from 'react';
import {
  Container,
  UploadReportButton,
  SectionTitle,
  StyledChart,
  AdditionalText,
  StyledTable,
  TitleRow
} from './financesStyles';
import {FinancialDataWrapper} from '../../modules/goodAnalytics/types';
import Loader from '../../components/common/loader';
import {GoodAnalyticsService} from '../../modules/goodAnalytics/service';
import {GoodsService} from '../../modules/goods/service';
import {useFilePicker} from 'use-file-picker';
import {convertFinancialDataToChart} from './utils';

type Props = {};

const Finances: React.FC<Props> = () => {
  const [financialDataWrapper, setFinancialDataWrapper] = useState<FinancialDataWrapper | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingReport, setIsUploadingReport] = useState(false);
  const [openFileSelector, {
    plainFiles,
    loading: isLoadingFile,
  }] = useFilePicker({
    accept: '.csv',
    multiple: false,
    readAs: 'DataURL',
  });

  const loadFinancialData = useCallback(() => {
    setIsLoading(true);
    GoodAnalyticsService
      .fetchFinancialData()
      .then(setFinancialDataWrapper)
      .finally(() => setIsLoading(false))
  }, [setIsLoading, setFinancialDataWrapper]);

  useEffect(() => {
    loadFinancialData()
  }, [loadFinancialData]);

  const onUploadReportClick = useCallback(() => {
    openFileSelector();
  }, [openFileSelector]);

  useEffect(() => {
    if (!plainFiles.length) {
      return;
    }
    setIsUploadingReport(true);
    GoodsService.uploadWbReport(plainFiles[0])
      .then(response => {
        if (response.success) {
          loadFinancialData()
        }
      })
      .finally(() => setIsUploadingReport(false));
  }, [plainFiles, setIsUploadingReport, loadFinancialData]);

  const additionalText = !!financialDataWrapper?.lastReportDate
    ? `Последняя дата в отчётах - ${financialDataWrapper?.lastReportDate}`
    : 'Нет данных в отчётах за последние 30 дней';

  const dataPerInterval = financialDataWrapper?.financialDataPerInterval;
  return (
    <Container>
      {isLoading && <Loader absolute root/>}
      <UploadReportButton
        label="Загрузить отчёт о продажах WB"
        onClick={onUploadReportClick}
        isLoading={isLoadingFile || isUploadingReport}
      />
      {dataPerInterval && (
        <>
          <SectionTitle>Продажи по дням за 30 дней</SectionTitle>
          <StyledChart
            data={convertFinancialDataToChart(dataPerInterval)}
          />
          <AdditionalText>{additionalText}</AdditionalText>

          <SectionTitle>Статистика</SectionTitle>
          <StyledTable>
            <tbody>
            <TitleRow>
              <td>Дата</td>
              <td>Продажи после комиссий</td>
              <td>Количество продаж</td>
              <td>Стоимость возвратов</td>
              <td>Количество возвратов</td>
              <td>Расходы на логистику</td>
              <td>Количество заказов/доставок</td>
            </TitleRow>
            <TitleRow>
              <td>Итого:</td>
              <td>{financialDataWrapper.totals.earnings}</td>
              <td>{financialDataWrapper.totals.saleCount}</td>
              <td>{financialDataWrapper.totals.returnOutcomes}</td>
              <td>{financialDataWrapper.totals.returnCount}</td>
              <td>{financialDataWrapper.totals.deliveryCosts}</td>
              <td>{financialDataWrapper.totals.deliveryCount}</td>
            </TitleRow>
            {
              Object.keys(dataPerInterval).map(intervalBeginning => (
                <tr key={intervalBeginning}>
                  <td>{intervalBeginning}</td>
                  <td>{dataPerInterval[intervalBeginning].earnings}</td>
                  <td>{dataPerInterval[intervalBeginning].saleCount}</td>
                  <td>{dataPerInterval[intervalBeginning].returnOutcomes}</td>
                  <td>{dataPerInterval[intervalBeginning].returnCount}</td>
                  <td>{dataPerInterval[intervalBeginning].deliveryCosts}</td>
                  <td>{dataPerInterval[intervalBeginning].deliveryCount}</td>
                </tr>
              ))
            }
            </tbody>
          </StyledTable>
        </>
      )}
    </Container>
  );
};

export default Finances;

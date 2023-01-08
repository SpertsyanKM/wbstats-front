import React, {useCallback, useEffect, useState} from 'react';
import {
  AdditionalText,
  Buttons,
  Container,
  SectionTitle,
  StyledChart,
  StyledTable,
  TitleRow,
  UploadReportButton
} from './financesStyles';
import {FinancialDataInterval, FinancialDataWrapper} from '../../modules/goodAnalytics';
import Loader from '../../components/common/loader';
import {GoodsService} from '../../modules/goods';
import {useFilePicker} from 'use-file-picker';
import {convertFinancialDataToChart, getFinancialDataFetcherByInterval, getFinancialDataTitleByInterval} from './utils';
import Button, {ButtonSize, ButtonType} from '../../components/common/button';
import {formatPrice} from '../../utils/string';

type Props = {};

const Finances: React.FC<Props> = () => {
  const [financialDataWrapper, setFinancialDataWrapper] = useState<FinancialDataWrapper | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingReport, setIsUploadingReport] = useState(false);
  const [interval, setInterval] = useState(FinancialDataInterval.PER_DAY);
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
    const fetcher = getFinancialDataFetcherByInterval(interval);
    fetcher()
      .then(setFinancialDataWrapper)
      .finally(() => setIsLoading(false))
  }, [setIsLoading, setFinancialDataWrapper, interval]);

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
    : 'Нет данных в отчётах';

  const title = getFinancialDataTitleByInterval(interval);
  const dataPerInterval = financialDataWrapper?.financialDataPerInterval;
  return (
    <Container>
      {isLoading && <Loader absolute root/>}
      <Buttons>
        <Button buttonType={ButtonType.Tertiary} size={ButtonSize.L} label="По дням" onClick={() => setInterval(FinancialDataInterval.PER_DAY)} />
        <Button buttonType={ButtonType.Tertiary} size={ButtonSize.L} label="По неделям" onClick={() => setInterval(FinancialDataInterval.PER_WEEK)} />
        <Button buttonType={ButtonType.Tertiary} size={ButtonSize.L} label="По месяцам" onClick={() => setInterval(FinancialDataInterval.PER_MONTH)} />
      </Buttons>
      {dataPerInterval && (
        <>
          <SectionTitle>{title}</SectionTitle>
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
              <td>Доход</td>
            </TitleRow>
            <TitleRow>
              <td>Итого:</td>
              <td>{formatPrice(financialDataWrapper.totals.earnings)}</td>
              <td>{financialDataWrapper.totals.saleCount}</td>
              <td>{formatPrice(financialDataWrapper.totals.returnOutcomes)}</td>
              <td>{financialDataWrapper.totals.returnCount}</td>
              <td>{formatPrice(financialDataWrapper.totals.deliveryCosts)}</td>
              <td>{financialDataWrapper.totals.deliveryCount}</td>
              <td>{formatPrice(financialDataWrapper.totals.totalEarnings)}</td>
            </TitleRow>
            {
              Object.keys(dataPerInterval).map(intervalBeginning => (
                <tr key={intervalBeginning}>
                  <td>{intervalBeginning}</td>
                  <td>{formatPrice(dataPerInterval[intervalBeginning].earnings)}</td>
                  <td>{dataPerInterval[intervalBeginning].saleCount}</td>
                  <td>{formatPrice(dataPerInterval[intervalBeginning].returnOutcomes)}</td>
                  <td>{dataPerInterval[intervalBeginning].returnCount}</td>
                  <td>{formatPrice(dataPerInterval[intervalBeginning].deliveryCosts)}</td>
                  <td>{dataPerInterval[intervalBeginning].deliveryCount}</td>
                  <td>{formatPrice(dataPerInterval[intervalBeginning].totalEarnings)}</td>
                </tr>
              ))
            }
            </tbody>
          </StyledTable>
        </>
      )}
      <UploadReportButton
        label="Загрузить отчёт о продажах WB"
        onClick={onUploadReportClick}
        isLoading={isLoadingFile || isUploadingReport}
      />
    </Container>
  );
};

export default Finances;

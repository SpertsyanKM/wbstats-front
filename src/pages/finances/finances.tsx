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
import {Marketplace} from '../../modules/marketplace';

type Props = {};

const Finances: React.FC<Props> = () => {
  const [financialDataWrapper, setFinancialDataWrapper] = useState<FinancialDataWrapper | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingReport, setIsUploadingReport] = useState(false);
  const [interval, setInterval] = useState(FinancialDataInterval.PER_DAY);
  const [marketplace, setMarketplace] = useState(Marketplace.WILDBERRIES);
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
    const method = marketplace === Marketplace.WILDBERRIES
      ? GoodsService.uploadWbReport
      : GoodsService.uploadOzonReport;

    console.log(marketplace);

    method(plainFiles[0])
      .then(response => {
        if (response.success) {
          loadFinancialData()
        }
      })
      .finally(() => setIsUploadingReport(false));
  }, [plainFiles, setIsUploadingReport, loadFinancialData, marketplace]);

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
              <td>Начальная дата</td>
              <td>Продажи (WB + Ozon)</td>
              <td>Кол-во продаж (WB + Ozon)</td>
              <td>Сумма возвратов (WB)</td>
              <td>Кол-во возвратов (WB)</td>
              <td>Сумма отмен (Ozon)</td>
              <td>Кол-во отмен (Ozon)</td>
              <td>Расходы на логистику (WB)</td>
              <td>Кол-во заказов/доставок (WB)</td>
              <td>Доход (WB + Ozon)</td>
            </TitleRow>
            <TitleRow>
              <td>Итого:</td>
              <td>{formatPrice(financialDataWrapper.totals.earnings)}</td>
              <td>{financialDataWrapper.totals.saleCount}</td>
              <td>{formatPrice(financialDataWrapper.totals.returnOutcomes)}</td>
              <td>{financialDataWrapper.totals.returnCount}</td>
              <td>{formatPrice(financialDataWrapper.totals.cancellationOutcomes)}</td>
              <td>{financialDataWrapper.totals.cancellationCount}</td>
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
                  <td>{formatPrice(dataPerInterval[intervalBeginning].cancellationOutcomes)}</td>
                  <td>{dataPerInterval[intervalBeginning].cancellationCount}</td>
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
        onClick={() => {
          setMarketplace(Marketplace.WILDBERRIES);
          onUploadReportClick()
        }}
        isLoading={isLoadingFile || isUploadingReport}
      />
      <UploadReportButton
        label="Загрузить отчёт о продажах OZON"
        onClick={() => {
          setMarketplace(Marketplace.OZON);
          onUploadReportClick()
        }}
        isLoading={isLoadingFile || isUploadingReport}
      />
    </Container>
  );
};

export default Finances;

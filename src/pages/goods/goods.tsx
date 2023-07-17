import React, {useCallback, useEffect, useState} from 'react';
import {
  AddGoodsButton,
  Container,
  StyledTable,
  ClickableRow,
  TitleRow,
  LoadStocksButton,
  LoadStocksRow,
  LastStocksLoadingDate,
  CenteredSell,
  Buttons, StyledChart,
} from './goodsStyles';
import Loader from '../../components/common/loader';
import {useDispatch, useSelector} from 'react-redux';
import {requestGoods, requestWbStocks, selectWbStocksById, GoodsService, useGoods} from '../../modules/goods';
import {useNavigate} from 'react-router';
import {ROUTE_GOOD} from '../../utils/route';
import EmptyState from '../../components/emptyState';
import {useFilePicker} from 'use-file-picker';
import {FinancialDataInterval, FinancialDataPerGoodWrapper} from '../../modules/goodAnalytics';
import {getFinancialDataPerGoodFetcherByInterval} from './utils';
import Button, {ButtonSize, ButtonType} from '../../components/common/button';
import {convertFinancialDataToChart} from '../finances/utils';

type Props = {};

const Goods: React.FC<Props> = () => {
  const [goods, isLoadingGoods] = useGoods();
  const wbStocks = useSelector(selectWbStocksById);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openFileSelector, {
    plainFiles,
    loading: isLoadingFile,
  }] = useFilePicker({
    accept: '.csv',
    multiple: false,
    readAs: 'DataURL',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStocks, setIsLoadingStocks] = useState(false);

  const [financialDataPerGood, setFinancialDataPerGood] = useState<FinancialDataPerGoodWrapper | undefined>(undefined);
  const [interval, setInterval] = useState(FinancialDataInterval.PER_MONTH);

  const loadFinancialData = useCallback(() => {
    setIsLoading(true);
    const fetcher = getFinancialDataPerGoodFetcherByInterval(interval);
    fetcher()
      .then(setFinancialDataPerGood)
      .finally(() => setIsLoading(false))
  }, [setIsLoading, setFinancialDataPerGood, interval]);

  const fetchGoods = useCallback(() => {
    setIsLoading(true);
    dispatch(requestGoods(() => setIsLoading(false)));
  }, [dispatch, setIsLoading]);

  const onGoodClick = useCallback(goodId => {
    navigate(`${ROUTE_GOOD}/${goodId}`);
  }, [navigate]);

  const onAddGoodsClick = useCallback(() => {
    openFileSelector();
  }, [openFileSelector]);

  const onLoadWbStocksClick = useCallback(() => {
    setIsLoadingStocks(true);
    dispatch(requestWbStocks(() => setIsLoadingStocks(false)));
  }, [dispatch, setIsLoadingStocks]);

  useEffect(() => {
    if (!plainFiles.length) {
      return;
    }
    setIsLoading(true);
    GoodsService.enrichGoods(plainFiles[0])
      .then(response => {
        if (response.success) {
          fetchGoods()
        }
      })
      .finally(() => setIsLoading(false));
  }, [plainFiles, setIsLoading, fetchGoods]);

  useEffect(() => {
    loadFinancialData()
  }, [loadFinancialData]);

  const lastLoadingDate = Object.values(wbStocks)[0]?.requestDate
  const areStocksLoaded = !!lastLoadingDate
  const stocksLoadingMessage = isLoadingStocks
    ? "Остатки загружаются. Это может занять некоторое время."
    : areStocksLoaded ? "Дата последнего обновления - " + lastLoadingDate : "";

  const totalQuantity = Object.values(wbStocks).map(stock => stock.quantity).reduce((a, b) => a + b, 0)
  const totalToClient = Object.values(wbStocks).map(stock => stock.inWayToClient).reduce((a, b) => a + b, 0)
  const totalFromClient = Object.values(wbStocks).map(stock => stock.inWayFromClient).reduce((a, b) => a + b, 0)

  return (
    <Container>
      {(!goods || isLoadingFile || isLoadingGoods || isLoading) && <Loader absolute root/>}
      {goods?.length === 0 && (
        <EmptyState text="Товаров пока нет" />
      )}
      {goods && goods.length && (
        <>
          <LoadStocksRow>
            <LoadStocksButton label="Загрузить остатки WB" onClick={onLoadWbStocksClick} />
            {!!stocksLoadingMessage && <LastStocksLoadingDate>{stocksLoadingMessage}</LastStocksLoadingDate>}
          </LoadStocksRow>
          <Buttons>
            <Button buttonType={ButtonType.Tertiary} size={ButtonSize.L} label="По дням" onClick={() => setInterval(FinancialDataInterval.PER_DAY)} />
            <Button buttonType={ButtonType.Tertiary} size={ButtonSize.L} label="По неделям" onClick={() => setInterval(FinancialDataInterval.PER_WEEK)} />
            <Button buttonType={ButtonType.Tertiary} size={ButtonSize.L} label="По месяцам" onClick={() => setInterval(FinancialDataInterval.PER_MONTH)} />
          </Buttons>
          <StyledTable>
          <tbody>
          <TitleRow>
            <CenteredSell>Артикул</CenteredSell>
            <CenteredSell>Название</CenteredSell>
            <CenteredSell>Продажи</CenteredSell>
            {areStocksLoaded && (
              <>
                <CenteredSell>Доступно для продажи</CenteredSell>
                <CenteredSell>На пути к клиенту</CenteredSell>
                <CenteredSell>На пути от клиента</CenteredSell>
              </>
            )}
          </TitleRow>
          {areStocksLoaded && (
            <tr>
              <td>Всего</td>
              <td />
              <td />
              <CenteredSell>{totalQuantity}</CenteredSell>
              <CenteredSell>{totalToClient}</CenteredSell>
              <CenteredSell>{totalFromClient}</CenteredSell>
            </tr>
          )}
            {goods.map(good => {
              const stocks = wbStocks[good.nomenclature];
              return (
                <ClickableRow key={good.id} onClick={() => onGoodClick(good.id)}>
                  <td>{good.originSku}{good.colorSku}</td>
                  <td>{good.name}</td>
                  <td>
                    {financialDataPerGood && financialDataPerGood.financialDataPerGood && financialDataPerGood.financialDataPerGood[good.id] && (
                      <StyledChart data={convertFinancialDataToChart(
                        financialDataPerGood.financialDataPerGood[good.id].financialDataPerInterval, true)}
                      />
                    )}
                  </td>
                  {areStocksLoaded && (
                    <>
                      <CenteredSell>{stocks?.quantity}</CenteredSell>
                      <CenteredSell>{stocks?.inWayToClient}</CenteredSell>
                      <CenteredSell>{stocks?.inWayFromClient}</CenteredSell>
                    </>
                  )}
                </ClickableRow>
              );
            })}
          </tbody>
        </StyledTable>
        </>
      )}
      <AddGoodsButton label="Добавить товары" onClick={onAddGoodsClick} />
    </Container>
  );
};

export default Goods;

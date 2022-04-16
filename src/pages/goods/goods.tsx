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
  CenteredSell
} from './goodsStyles';
import Loader from '../../components/common/loader';
import {useDispatch, useSelector} from 'react-redux';
import {requestGoods, requestWbStocks} from '../../modules/goods/thunks';
import {selectSortedGoods, selectWbStocksById} from '../../modules/goods/selectors';
import {useNavigate} from 'react-router';
import {ROUTE_GOOD} from '../../utils/route';
import EmptyState from '../../components/emptyState';
import {useFilePicker} from 'use-file-picker';
import {GoodsService} from '../../modules/goods/service';

type Props = {};

const Goods: React.FC<Props> = () => {
  const goods = useSelector(selectSortedGoods);
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

  const fetchGoods = useCallback(() => {
    setIsLoading(true);
    dispatch(requestGoods(() => setIsLoading(false)));
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    if (!goods) {
      fetchGoods()
    }
  }, [goods, fetchGoods]);

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
      {(!goods || isLoadingFile || isLoading) && <Loader absolute root/>}
      {goods?.length === 0 && (
        <EmptyState text="Товаров пока нет" />
      )}
      <LoadStocksRow>
        <LoadStocksButton label="Загрузить остатки WB" onClick={onLoadWbStocksClick} />
        {!!stocksLoadingMessage && <LastStocksLoadingDate>{stocksLoadingMessage}</LastStocksLoadingDate>}
      </LoadStocksRow>
      {goods && goods.length && (
        <StyledTable>
          <tbody>
          <TitleRow>
            <CenteredSell>Артикул</CenteredSell>
            <CenteredSell>Название</CenteredSell>
            <CenteredSell>Баркод</CenteredSell>
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
                  <td>{good.barcode}</td>
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
      )}
      <AddGoodsButton label="Добавить товары" onClick={onAddGoodsClick} />
    </Container>
  );
};

export default Goods;

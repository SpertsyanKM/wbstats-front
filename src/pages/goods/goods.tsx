import React, {useCallback, useEffect, useState} from 'react';
import {AddGoodsButton, Container, StyledTable, ClickableRow, TitleRow} from './goodsStyles';
import Loader from '../../components/common/loader';
import {useDispatch, useSelector} from 'react-redux';
import {requestGoods} from '../../modules/goods/thunks';
import {selectSortedGoods} from '../../modules/goods/selectors';
import {useNavigate} from 'react-router';
import {ROUTE_GOOD} from '../../utils/route';
import EmptyState from '../../components/emptyState';
import {useFilePicker} from 'use-file-picker';
import {GoodsService} from '../../modules/goods/service';

type Props = {};

const Goods: React.FC<Props> = () => {
  const goods = useSelector(selectSortedGoods);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openFileSelector, {
    plainFiles,
    loading: isLoadingFile,
  }] = useFilePicker({
    accept: '.csv',
    multiple: false,
    readAs: "DataURL",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchGoods = useCallback(() => {
    setIsLoading(true);
    dispatch(requestGoods(() => {
      setIsLoading(false);
    }));
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

  useEffect(() => {
    if (!plainFiles.length) {
      return;
    }
    setIsLoading(true);
    console.log('sending file: ', plainFiles[0]);
    GoodsService.enrichGoods(plainFiles[0])
      .then(response => {
        if (response.success) {
          fetchGoods()
        }
      })
      .finally(() => setIsLoading(false));
  }, [plainFiles, setIsLoading, fetchGoods]);

  return (
    <Container>
      {(!goods || isLoadingFile || isLoading) && <Loader absolute root/>}
      {goods?.length === 0 && (
        <EmptyState text="Товаров пока нет" />
      )}
      <AddGoodsButton label="Добавить товары" onClick={onAddGoodsClick} />
      {goods && goods.length && (
        <StyledTable>
          <tbody>
          <TitleRow>
            <td>Артикул</td>
            <td>Название</td>
            <td>Баркод</td>
          </TitleRow>
            {goods.map(good => (
              <ClickableRow onClick={() => onGoodClick(good.id)}>
                <td>{good.originSku}{good.colorSku}</td>
                <td>{good.name}</td>
                <td>{good.barcode}</td>
              </ClickableRow>
            ))}
          </tbody>
        </StyledTable>
      )}
    </Container>
  );
};

export default Goods;

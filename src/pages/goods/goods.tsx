import React, {useCallback, useEffect} from 'react';
import {Container} from './goodsStyles';
import Loader from '../../components/common/loader';
import {useDispatch, useSelector} from 'react-redux';
import {requestGoods} from '../../modules/goods/thunks';
import {selectSortedGoods} from '../../modules/goods/selectors';
import Button, {ButtonType} from '../../components/common/button';
import {useNavigate} from 'react-router';
import {ROUTE_GOOD} from '../../utils/route';

type Props = {};

const Goods: React.FC<Props> = () => {
  const goods = useSelector(selectSortedGoods);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!goods?.length) {
      dispatch(requestGoods());
    }
  }, [goods, dispatch]);

  const onGoodClick = useCallback(goodId => {
    navigate(`${ROUTE_GOOD}/${goodId}`);
  }, [navigate]);

  return (
    <Container>
      {!goods?.length && <Loader root/>}
      {goods.map(good => (
        <Button
          key={good.id}
          buttonType={ButtonType.Secondary}
          onClick={() => onGoodClick(good.id)}
          label={`${good.originSku}${good.colorSku}`}
        />
      ))}
    </Container>
  );
};

export default Goods;

import React, {useCallback} from 'react';
import {BoxGood} from '../../../../modules/supply';
import {Container, GoodName} from './boxGoodStyles';
import Quantity, {QuantitySize} from '../../../../components/quantity';
import {useSelector} from 'react-redux';
import {selectGoodById} from '../../../../modules/goods';

type Props = {
  boxGood: BoxGood;
  onGoodCountChanged: (boxGood: BoxGood, newCount: number) => void;
};

const BoxGoodView: React.FC<Props> = ({boxGood, onGoodCountChanged}) => {
  const onCountChanged = useCallback((newCount: number) => {
    onGoodCountChanged(boxGood, newCount);
  }, [boxGood, onGoodCountChanged]);
  const good = useSelector(state => selectGoodById(state, boxGood.goodId));

  return (
    <Container>
      <GoodName>{good?.name ?? "ТОВАР НЕ НАЙДЕН!"}</GoodName>
      <Quantity size={QuantitySize.Small} initialCount={boxGood.count} maxCount={100000} onCountChanged={onCountChanged} />
    </Container>
  );
};

export default BoxGoodView;

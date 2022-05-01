import React, {useCallback} from 'react';
import {BoxGood} from '../../../../modules/supply';
import {Container, GoodName, RemoveGoodButton, StyledQuantity} from './boxGoodStyles';
import {QuantitySize} from '../../../../components/quantity';
import {useSelector} from 'react-redux';
import {selectGoodById} from '../../../../modules/goods';
import {MdOutlineClose} from 'react-icons/md';

type Props = {
  boxGood: BoxGood;
  onGoodCountChanged: (boxGood: BoxGood, newCount: number) => void;
  onRemoveClicked: (boxGood: BoxGood) => void;
};

const BoxGoodView: React.FC<Props> = ({boxGood, onGoodCountChanged, onRemoveClicked}) => {
  const onCountChanged = useCallback((newCount: number) => {
    onGoodCountChanged(boxGood, newCount);
  }, [boxGood, onGoodCountChanged]);
  const good = useSelector(state => selectGoodById(state, boxGood.goodId));

  return (
    <Container>
      <GoodName>{good?.name ?? "ТОВАР НЕ НАЙДЕН!"}</GoodName>
      <StyledQuantity size={QuantitySize.XS} initialCount={boxGood.count} maxCount={100000} onCountChanged={onCountChanged} />
      <RemoveGoodButton icon={<MdOutlineClose />} onClick={() => onRemoveClicked(boxGood)} />
    </Container>
  );
};

export default BoxGoodView;

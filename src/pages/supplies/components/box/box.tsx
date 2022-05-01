import React, {useCallback, useState} from 'react';
import {Box, BoxGood, removeBox, setGoodToBox} from '../../../../modules/supply';
import {
  BoxTitle,
  BoxText,
  OuterContainer,
  InnerContainer,
  GoodsContainer,
  AddGoodButton,
  TitleContainer,
  RemoveBoxButton
} from './boxStyles';
import BoxGoodView from '../boxGood';
import {useDispatch} from 'react-redux';
import {MdOutlineClose} from 'react-icons/md';
import GoodSelector from '../goodSelector/goodSelector';
import {Good} from '../../../../modules/goods';

type Props = {
  box: Box;
};

const BoxView: React.FC<Props> = ({box}) => {
  const dispatch = useDispatch();
  const onGoodCountChanged = useCallback((boxGood: BoxGood, newCount: number) => {
    boxGood.count = newCount;
    dispatch(setGoodToBox(box, boxGood));
  }, [box, dispatch]);
  const [isGoodsOverlayVisible, setIsGoodOverlayVisible] = useState(false);

  const onAddGoodClick = useCallback(() => {
    setIsGoodOverlayVisible(true);
  }, [setIsGoodOverlayVisible]);

  const onRemoveBoxClick = useCallback(() => {
    dispatch(removeBox(box));
  }, [dispatch, box]);

  const onGoodsOverlayClose = useCallback(() => {
    setIsGoodOverlayVisible(false);
  }, [setIsGoodOverlayVisible])

  const onNewGoodSelected = useCallback((good: Good) => {
    dispatch(setGoodToBox(box, {goodId: good.id, count: 1}))
    setIsGoodOverlayVisible(false);
  }, [dispatch, box, setIsGoodOverlayVisible]);

  return (
    <OuterContainer>
      <InnerContainer>
        <TitleContainer>
          <BoxTitle>Коробка №{box.index + 1}</BoxTitle>
          <RemoveBoxButton onClick={onRemoveBoxClick} icon={<MdOutlineClose />} />
        </TitleContainer>
        {!box.goods.length && <BoxText>Нет товаров</BoxText>}
        <GoodsContainer>
          {box.goods.map(good => (
            <BoxGoodView
              key={good.goodId}
              boxGood={good}
              onGoodCountChanged={onGoodCountChanged}
            />
          ))}
        </GoodsContainer>
        <AddGoodButton onClick={onAddGoodClick} label="Добавить товар" />
        <GoodSelector isVisible={isGoodsOverlayVisible} onClose={onGoodsOverlayClose} onGoodSelected={onNewGoodSelected} />
      </InnerContainer>
    </OuterContainer>
  );
};

export default BoxView;

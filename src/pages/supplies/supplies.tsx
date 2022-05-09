import React, {useCallback, useState} from 'react';
import {
  AddBoxButton,
  BoxesContainer,
  Container,
  Title,
  WbBoxIdInput,
  WbBoxIdPrefix,
  WbButton,
  WbButtonContainer
} from './suppliesStyles';
import {useDispatch, useSelector} from 'react-redux';
import {addBox, Box, selectNewSupplyBoxes, Supply} from '../../modules/supply';
import BoxView from './components/box';
import {selectGoodsById, useGoods} from '../../modules/goods';
import Loader from '../../components/common/loader';
import {exportSupplyToWbBoxesXlsx, exportSupplyToWbOrderXlsx} from '../../modules/supply/utils';
import {WB_BOX_ID_PREFIX} from '../../modules/supply/constants';

type Props = {};

const Supplies: React.FC<Props> = () => {
  const newSupplyBoxes = useSelector(selectNewSupplyBoxes);
  const dispatch = useDispatch();
  const onAddBoxClick = useCallback(() => {
    dispatch(addBox());
  }, [dispatch]);
  const [goods, isLoadingGoods] = useGoods();
  const goodsById = useSelector(selectGoodsById);
  const [wbFirstBoxId, setWbFirstBoxId] = useState("");

  const onCreateOrderClick = useCallback(() => {
    const supply: Supply = {boxes: newSupplyBoxes};
    exportSupplyToWbOrderXlsx(supply, goodsById);
  }, [newSupplyBoxes, goodsById]);

  const onLinkBoxIdsClick = useCallback(() => {
    const supply: Supply = {boxes: newSupplyBoxes};
    const wbFirstBoxIdNum = parseInt(wbFirstBoxId);
    exportSupplyToWbBoxesXlsx(supply, goodsById, wbFirstBoxIdNum);
  }, [newSupplyBoxes, goodsById, wbFirstBoxId]);

  return (
    <Container>
      <Title>Новая поставка</Title>
      {isLoadingGoods && <Loader absolute root/>}
      {goods && (
        <>
          <BoxesContainer>
            {
              newSupplyBoxes.map((box: Box) => <BoxView key={box.index} box={box}/>)
            }
          </BoxesContainer>
          <WbButtonContainer>
            <WbButton label="Создать поставку" onClick={onCreateOrderClick} />
            <WbBoxIdPrefix>ШК первой коробки: {WB_BOX_ID_PREFIX}</WbBoxIdPrefix>
            <WbBoxIdInput value={wbFirstBoxId} onChange={setWbFirstBoxId} />
            <WbButton label="Привязать штрихкоды" onClick={onLinkBoxIdsClick} />
          </WbButtonContainer>
        </>
      )}
      <AddBoxButton onClick={onAddBoxClick} label="Добавить коробку"/>
    </Container>
  );
};

export default Supplies;

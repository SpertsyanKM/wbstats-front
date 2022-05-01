import React, {useCallback} from 'react';
import {AddBoxButton, BoxesContainer, Container, Title} from './suppliesStyles';
import {useDispatch, useSelector} from 'react-redux';
import {addBox, Box, selectNewSupplyBoxes} from '../../modules/supply';
import BoxView from './components/box';
import {useGoods} from '../../modules/goods';
import Loader from '../../components/common/loader';

type Props = {};

const Supplies: React.FC<Props> = () => {
  const newSupplyBoxes = useSelector(selectNewSupplyBoxes);
  const dispatch = useDispatch();
  const onAddBoxClick = useCallback(() => {
    dispatch(addBox());
  }, [dispatch]);
  const [goods, isLoadingGoods] = useGoods();

  return (
    <Container>
      <Title>Новая поставка</Title>
      {isLoadingGoods && <Loader absolute root/>}
      {goods && (
        <BoxesContainer>
          {
            newSupplyBoxes.map((box: Box) => <BoxView key={box.index} box={box}/>)
          }
        </BoxesContainer>
      )}
      <AddBoxButton onClick={onAddBoxClick} label="Добавить коробку"/>
    </Container>
  );
};

export default Supplies;

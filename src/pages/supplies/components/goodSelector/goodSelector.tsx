import React, {useState} from 'react';
import {Good, useGoods} from '../../../../modules/goods';
import Overlay from '../../../../components/overlay';
import {GoodRow, GoodsContainer, SearchInput} from './goodSelectorStyles';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onGoodSelected: (good: Good) => void;
};

const GoodSelector: React.FC<Props> = ({isVisible, onGoodSelected, onClose}) => {
  const [goods] = useGoods();
  const [term, setTerm] = useState('');

  const filteredGoods = (goods ?? []).filter(good => good.name.toLowerCase().includes(term.toLowerCase()));
  return (
    <Overlay isVisible={isVisible} closable onClose={onClose}>
      <SearchInput placeholder="Наименование" value={term} onChange={setTerm}/>
      <GoodsContainer>
        {filteredGoods?.map(good => (
          <GoodRow key={good.id} onClick={() => onGoodSelected(good)}>{good.name}</GoodRow>
        ))}
      </GoodsContainer>
    </Overlay>
  );
};

export default GoodSelector;

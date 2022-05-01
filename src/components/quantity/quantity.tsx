import React, {useCallback, useEffect, useState} from 'react';
import {Container, QuantityButton, QuantityInput} from './quantityStyles';
import {getOnlyNumeric} from '../../utils/string';
import {QuantitySize} from './types';
import {TypographySize} from '../common/styling';

type Props = {
  initialCount: number;
  maxCount: number;
  onCountChanged: (count: number) => void;
  size?: QuantitySize;
  className?: string;
};

const Quantity: React.FC<Props> = ({
  initialCount,
  maxCount,
  onCountChanged: onCountChangedCallback,
  size = QuantitySize.L,
  className,
}) => {
  const [count, setStateCount] = useState(initialCount);

  useEffect(() => {
    setStateCount(initialCount);
  }, [initialCount]);

  const setCount = useCallback((count: number) => {
    const newCount = maxCount ? Math.min(count, maxCount) : count;
    setStateCount(newCount);
    onCountChangedCallback(newCount);
  }, [maxCount, setStateCount, onCountChangedCallback]);

  const onCountChanged = (count: string) => {
    const numeric = getOnlyNumeric(count);
    const value = Number.parseInt(numeric);
    const newCount = isNaN(value) || value === 0 ? 1 : value;
    setCount(newCount);
  };

  return (
    <Container className={className}>
      <QuantityButton
        quantitySize={size}
        label="-"
        onClick={() => setCount(Math.max(1, count - 1))}
      />
      <QuantityInput
        quantitySize={size}
        size={size === QuantitySize.XS ? TypographySize.XS : TypographySize.S}
        customStateManagement
        value={count.toString()}
        onChange={onCountChanged}
      />
      <QuantityButton
        quantitySize={size}
        label="+"
        onClick={() => setCount(count + 1)}
      />
    </Container>
  );
};

export default Quantity;


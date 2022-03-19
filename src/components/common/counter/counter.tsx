import React from 'react';
import {CounterType} from './types';
import {Container} from './counterStyles';

type CounterProps = {
  type?: CounterType;
  count: number;
  className?: string;
};

const Counter: React.FC<CounterProps> = ({
  type = CounterType.Primary,
  count,
  className,
}) => (
  <Container type={type} className={className}>{count}</Container>
);

export default Counter;

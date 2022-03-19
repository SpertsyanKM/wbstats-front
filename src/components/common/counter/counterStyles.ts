import styled from 'styled-components';
import {Color, Padding, Typography} from '../styling';
import {CounterType} from './types';

type ContainerProps = {
  type: CounterType;
}

export const Container = styled.div<ContainerProps>`
  ${Typography.primary.xs.regular};
  padding: 0 ${Padding.xs};
  color: ${Color.TextWhite};
  min-width: 15px;
  box-sizing: border-box;
  background-color: ${props => props.type === CounterType.Primary ? Color.Primary : Color.White};
  border-radius: 7.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

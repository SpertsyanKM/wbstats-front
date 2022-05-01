import styled from 'styled-components';
import Button, {ButtonSize, ButtonType} from '../common/button';
import Input from '../common/input';
import {Padding} from '../common/styling';
import {QuantitySize} from './types';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

type ButtonProps = {
  quantitySize: QuantitySize;
};
export const QuantityButton = styled(Button).attrs({
  buttonType: ButtonType.Secondary,
  size: ButtonSize.S
})<ButtonProps>`
  ${props => props.quantitySize === QuantitySize.XS ? `
    padding: 0 ${Padding.xs} 0 ${Padding.xs};
  ` : undefined}
`;

type InputProps = {
  quantitySize: QuantitySize;
};
export const QuantityInput = styled(Input)<InputProps>`
  padding-left: ${Padding.xxs};
  padding-right: ${Padding.xxs};
  ${(props: InputProps) => (props.quantitySize === QuantitySize.S || props.quantitySize === QuantitySize.XS) ? `
  padding-top: 0;
  padding-bottom: 0;
  ` : undefined}
  max-width: ${(props: InputProps) => 
    props.quantitySize === QuantitySize.L
      ? '40'
      : props.quantitySize === QuantitySize.S
        ? '32'
        : '20'
  }px;
  border-left-width: 0;
  border-right-width: 0;
  &:focus {
    border-left-width: 0;
    border-right-width: 0;  
  }
`;

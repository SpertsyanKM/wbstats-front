import styled from 'styled-components';
import Button, {ButtonSize, ButtonType} from '../common/button';
import Input from '../common/input';
import {Padding} from '../common/styling';
import {QuantitySize} from './types';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const QuantityButton = styled(Button).attrs({
  buttonType: ButtonType.Secondary,
  size: ButtonSize.S
})`
`;

type InputProps = {
  quantitySize: QuantitySize;
};
export const QuantityInput = styled(Input)<InputProps>`
  padding-left: ${Padding.xxs};
  padding-right: ${Padding.xxs};
  ${(props: InputProps) => props.quantitySize === QuantitySize.Small ? `
  padding-top: 0;
  padding-bottom: 0;
  ` : undefined}
  max-width: ${(props: InputProps) => props.quantitySize === QuantitySize.Big ? '40' : '32'}px;
  border-left-width: 0;
  border-right-width: 0;
  &:focus {
    border-left-width: 0;
    border-right-width: 0;  
  }
`;

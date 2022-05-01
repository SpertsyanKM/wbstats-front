import styled from 'styled-components';
import {Padding, Typography} from '../../../../components/common/styling';
import Quantity from '../../../../components/quantity';
import Button, {ButtonSize, ButtonType} from '../../../../components/common/button';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const GoodName = styled.span`
  ${Typography.primary.s.regular}
  flex: 1;
  align-self: center;
`;

export const StyledQuantity = styled(Quantity)`
  align-self: start;
`;

export const RemoveGoodButton = styled(Button).attrs({
  buttonType: ButtonType.Tertiary,
  size: ButtonSize.S,
})`
  padding: ${Padding.xxs};
  align-self: start;
  margin-left: ${Padding.s};
`;
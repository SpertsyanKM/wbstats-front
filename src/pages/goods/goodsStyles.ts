import styled from 'styled-components';
import Block from '../../components/common/block';
import Button from '../../components/common/button';
import {Color, Padding, Typography} from '../../components/common/styling';

export const Container = styled(Block).attrs({
  root: true,
})`
  flex-direction: column;
  position: relative;
`;

export const AddGoodsButton = styled(Button)`
  margin-top: ${Padding.l};
  align-self: center;
`;

export const StyledTable = styled.table`
  margin-top: ${Padding.l};
  ${Typography.primary.m.medium}
`;

export const TitleRow = styled.tr`
  ${Typography.primary.m.bold}
`;

export const ClickableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background: ${Color.Grey};
  }
`;
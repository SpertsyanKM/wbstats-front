import styled from 'styled-components';
import Block from '../../components/common/block';
import Button, {ButtonType} from '../../components/common/button';
import {Color, Padding, Typography} from '../../components/common/styling';

export const Container = styled(Block).attrs({
  root: true,
})`
  flex-direction: column;
  position: relative;
`;

export const AddGoodsButton = styled(Button).attrs({
  buttonType: ButtonType.Secondary
})`
  margin-top: ${Padding.l};
  align-self: center;
`;

export const LoadStocksRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-top: ${Padding.l};
  align-items: center;
`;

export const LoadStocksButton = styled(Button).attrs({
  buttonType: ButtonType.Secondary
})`
`;

export const LastStocksLoadingDate = styled.span`
  ${Typography.secondary.m.regular}
  margin-left: ${Padding.m};
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

export const CenteredSell = styled.td`
  text-align: center;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

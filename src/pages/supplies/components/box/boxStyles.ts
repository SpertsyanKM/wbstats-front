import styled from 'styled-components';
import Block from '../../../../components/common/block';
import {BlockSize} from '../../../../components/common/block/types';
import {Color, Padding, Typography} from '../../../../components/common/styling';
import Button, {ButtonSize, ButtonType} from '../../../../components/common/button';

export const OuterContainer = styled(Block).attrs({
  size: BlockSize.S3,
})`
`;

export const InnerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 200px;
  border: 2px solid ${Color.Border};
  margin: ${Padding.s};
  padding: ${Padding.s};
`;

export const GoodsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex: 0;
  flex-direction: row;
  margin-bottom: ${Padding.l};
`;

export const BoxTitle = styled.span`
  ${Typography.title.s.regular}
  flex: 1;
`;

export const RemoveBoxButton = styled(Button).attrs({
  buttonType: ButtonType.Tertiary,
  size: ButtonSize.S,
})`
`;

export const BoxText = styled.span`
  ${Typography.primary.m.regular}
  align-self: center;
`;

export const AddGoodButton = styled(Button).attrs({
  buttonType: ButtonType.Secondary
})`
  margin-top: ${Padding.l};
  align-self: center;
`;

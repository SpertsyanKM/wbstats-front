import styled from 'styled-components';
import Block from '../../components/common/block';
import {Padding, Typography} from '../../components/common/styling';
import Button, {ButtonType} from '../../components/common/button';

export const Container = styled(Block).attrs({
  root: true,
})`
  flex-direction: column;
`;

export const BoxesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Title = styled.span`
  ${Typography.title.m.regular}
  margin-bottom: ${Padding.s};
`;

export const AddBoxButton = styled(Button).attrs({
  buttonType: ButtonType.Secondary
})`
  margin-top: ${Padding.l};
  align-self: center;
`;

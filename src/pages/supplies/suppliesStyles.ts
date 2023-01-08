import styled from 'styled-components';
import Block from '../../components/common/block';
import {Padding, Typography} from '../../components/common/styling';
import Button, {ButtonType} from '../../components/common/button';
import Input from '../../components/common/input';

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

export const WbButtonContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-top: ${Padding.l};
`;

export const WbButton = styled(Button).attrs({
  buttonType: ButtonType.Secondary
})`
`;

export const WbBoxIdPrefix = styled.span`
  ${Typography.primary.l.regular}
  margin-left: ${Padding.xl};
`;

export const WbBoxIdInput = styled(Input)`
  flex: 0;
  margin-right: ${Padding.l};
`;

export const AddBoxesRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${Padding.l};
`;

export const AddBoxesButton = styled(Button).attrs({
  buttonType: ButtonType.Secondary
})`
`;

export const WbBoxCountInput = styled(Input)`
  flex: 0;
  margin-right: ${Padding.l};
  width: 100px;
`;

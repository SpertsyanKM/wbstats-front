import styled from 'styled-components';
import Block from '../common/block';
import {BlockSize} from '../common/block/types';
import {Typography} from '../common/styling';

export const Container = styled(Block).attrs({
  size: BlockSize.S4
})`
  align-items: center;
  justify-content: center;
`;

export const Text = styled.span`
  ${Typography.primary.l.regular}
`;

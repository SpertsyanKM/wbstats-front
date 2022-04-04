import styled from 'styled-components';
import Block from '../../components/common/block';
import {BlockSize} from '../../components/common/block/types';
import Input from '../../components/common/input';
import {Color, Padding, Typography} from '../../components/common/styling';

export const Container = styled(Block).attrs({
  root: true
})`
  align-items: center;
  justify-content: center;
`;

export const Content = styled(Block).attrs({
  size: BlockSize.S3
})`
  flex-direction: column;
`;

export const StyledInput = styled(Input)`
  padding-bottom: ${Padding.m}
`;

export const ErrorMessage = styled.span`
  ${Typography.secondary.m.regular}
  color: ${Color.TextError};
  margin-bottom: ${Padding.m};
`;

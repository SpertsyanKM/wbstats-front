import styled from 'styled-components';
import {BlockSize} from './types';
import {StyleConstants} from '../styling';

type ContainerProps = {
  root: boolean;
  size: BlockSize;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: ${props => 100.0 * props.size / BlockSize.S12}%;
  max-width: ${StyleConstants.siteMaxWidth};
  ${props => props.root ? `
    align-self: center;
  ` : ''}
`;

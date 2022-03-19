import styled from 'styled-components';
import {Padding} from '../common/styling';
import Block from '../common/block';

export const Container = styled(Block)`
  flex-direction: column;
  padding-top: 15px;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: ${Padding.l} ${Padding.m};
  &last-of-type: {
    padding-bottom: 30px;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

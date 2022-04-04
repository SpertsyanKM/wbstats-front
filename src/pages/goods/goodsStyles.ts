import styled from 'styled-components';
import Block from '../../components/common/block';

export const Container = styled(Block).attrs({
  root: true,
})`
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

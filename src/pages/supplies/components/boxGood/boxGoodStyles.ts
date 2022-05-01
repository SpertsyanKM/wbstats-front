import styled from 'styled-components';
import {Typography} from '../../../../components/common/styling';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const GoodName = styled.span`
  ${Typography.primary.s.regular}
  flex: 1;
  align-self: center;
`;

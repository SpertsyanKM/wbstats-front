import styled from 'styled-components';
import {Color, Padding, Typography} from '../../../../components/common/styling';
import Input from '../../../../components/common/input';

export const GoodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 400px;
  width: 600px;
  margin-top: ${Padding.s};
`;

export const GoodRow = styled.span`
  ${Typography.primary.m.regular}
  cursor: pointer;
  &:hover {
    background: ${Color.Grey};
  }
`;

export const SearchInput = styled(Input)`
`;

import styled from 'styled-components';
import {Padding, Typography} from '../../components/common/styling';
import Block from '../../components/common/block';
import Chart from '../../components/chart';

export const Content = styled(Block).attrs({
  root: true,
})`
  flex-direction: column;
`;

export const GoodTitle = styled.span`
  ${Typography.title.m.medium}
  margin-bottom: ${Padding.l};
  align-self: center;
`;

export const SectionTitle = styled.span`
  ${Typography.primary.l.medium}
`;

export const StyledChart = styled(Chart)`
  margin-top: ${Padding.l};
  align-self: center;
`;

export const StyledTable = styled.table`
  margin-top: ${Padding.l};
  ${Typography.primary.m.medium}
`;

export const TitleRow = styled.tr`
  ${Typography.primary.m.bold}
`;

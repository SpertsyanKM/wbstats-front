import Block from '../../components/common/block';
import styled from 'styled-components';
import Button, {ButtonType} from '../../components/common/button';
import {Padding, Typography} from '../../components/common/styling';
import Chart from '../../components/chart';

export const Container = styled(Block).attrs({
  root: true,
})`
  flex-direction: column;
`;

export const UploadReportButton = styled(Button).attrs({
  buttonType: ButtonType.Secondary
})`
  margin-top: ${Padding.l};
  align-self: center;
`;

export const SectionTitle = styled.span`
  ${Typography.primary.l.medium}
  margin-top: ${Padding.l};
  align-self: center;
`;

export const StyledChart = styled(Chart)`
  margin-top: ${Padding.l};
  align-self: center;
`;

export const AdditionalText = styled.span`
  ${Typography.secondary.m.regular}
  margin-top: ${Padding.l};
`;

export const StyledTable = styled.table`
  margin-top: ${Padding.l};
  ${Typography.primary.m.medium}
`;

export const TitleRow = styled.tr`
  ${Typography.primary.m.bold}
`;

import styled from 'styled-components';
import {
  Color,
  Padding,
  StyleConstants,
  Typography,
  TypographyConfig, TypographySize,
} from '../styling';
import ReactInputMask from 'react-input-mask';

type Props = {
  config: TypographyConfig;
  isError: boolean;
};

export const StyledInput = styled.input<Props>`
  ${props => props.config.size === TypographySize.XS ? `
    padding: 0 ${Padding.xs} 0 ${Padding.xs};
  ` : `
    padding: ${Padding.m};
  `}
  border: ${StyleConstants.borderThinWidth} solid ${props => props.isError ? Color.BorderRed : Color.Border};
  flex: 0;
  ${(props: Props) => Typography[props.config.theme][props.config.size][props.config.weight]}
  transition: border-color .5s ease;
  &:focus {
    outline: none;
    border: ${StyleConstants.borderThinWidth} solid ${props => props.isError ? Color.BorderRedFocused : Color.BorderFocused}; 
  }
`;

export const StyledMaskedInput = styled(ReactInputMask)<Props>`
  padding: ${Padding.m};
  border: ${StyleConstants.borderThinWidth} solid ${props => props.isError ? Color.BorderRed : Color.Border};
  flex: 0;
  ${(props: Props) => Typography[props.config.theme][props.config.size][props.config.weight]}
  transition: border-color .5s ease;
  &:focus {
    outline: none;
    border: ${StyleConstants.borderThinWidth} solid ${props => props.isError ? Color.BorderRedFocused : Color.BorderFocused};
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ErrorText = styled.span`
  ${Typography.primary.s.regular}
  color: ${Color.TextError};
`;

import {ButtonSize, ButtonTheme, ButtonType} from './types';
import {Color, Padding, StyleConstants, Typography} from '../styling';
import styled from 'styled-components';
import Counter from '../counter';

const ButtonTypography = {
  [ButtonType.Primary]: {
    [ButtonSize.S]: Typography.primary.s.medium,
    [ButtonSize.M]: Typography.primary.m.medium,
    [ButtonSize.L]: Typography.primary.l.medium,
  },
  [ButtonType.Secondary]: {
    [ButtonSize.S]: Typography.secondary.s.regular,
    [ButtonSize.M]: Typography.secondary.m.regular,
    [ButtonSize.L]: Typography.secondary.l.regular,
  },
  [ButtonType.Tertiary]: {
    [ButtonSize.S]: Typography.primary.s.regular,
    [ButtonSize.M]: Typography.primary.m.regular,
    [ButtonSize.L]: Typography.primary.l.regular,
  },
};

const getButtonBackgroundColor = (type: ButtonType, isLoading: boolean) => {
  if (type === ButtonType.Primary) {
    return isLoading ? Color.Grey : Color.Primary;
  }

  return Color.White;
};

const getButtonContentColor = (type: ButtonType, theme: ButtonTheme) => {
  if (type === ButtonType.Primary) {
    return Color.TextWhite;
  }

  if (theme === ButtonTheme.Bright) {
    return Color.TextBright;
  }

  return Color.TextPrimary;
};

const getButtonHoverStyle = (type: ButtonType, theme: ButtonTheme, isLoading: boolean) => {
  if (isLoading) {
    return '';
  }

  switch (type) {
    case ButtonType.Primary:
      return `background-color: ${Color.PrimaryHovered};`;
    case ButtonType.Secondary:
      return `background-color: ${Color.WhiteHovered};`;
    case ButtonType.Tertiary:
      switch (theme) {
        case ButtonTheme.Default:
          return `color: ${Color.TextPrimaryHovered};`;
        case ButtonTheme.Bright:
          return `color: ${Color.TextBrightHovered};`;
      }
  }
};

const getButtonPaddingBySize = (size: ButtonSize, hasText: boolean, noVerticalPadding?: boolean) => {
  switch (size) {
    case ButtonSize.S:
      return `${noVerticalPadding ? 0 : Padding.s} ${Padding.s}`;
    case ButtonSize.M:
      return `${noVerticalPadding ? 0 : Padding.s} ${hasText ? Padding.xl : Padding.m}`;
    case ButtonSize.L:
      return `${noVerticalPadding ? 0 : Padding.m} ${hasText ? Padding.xl : Padding.m}`;
  }

  return '';
};

type StyledButtonProps = {
  size: ButtonSize;
  buttonType: ButtonType;
  hasText: boolean;
  noVerticalPadding?: boolean;
  theme: ButtonTheme;
  isLoading: boolean;
};

export const StyledButton = styled.div<StyledButtonProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: ${props => getButtonPaddingBySize(props.size, props.hasText, props.noVerticalPadding)};
  ${props => props.buttonType === ButtonType.Secondary ? `
    border-color: ${Color.Border};
    border-style: solid;
    border-width: ${StyleConstants.borderThinWidth};
  ` : `
    border-style: none;
  `}
  ${props => ButtonTypography[props.buttonType][props.size]};
  background-color: ${props => getButtonBackgroundColor(props.buttonType, props.isLoading)};
  color: ${props => getButtonContentColor(props.buttonType, props.theme)};
  cursor: pointer;
  text-decoration: none;
  transition: all .25s ease;
  &:hover {
    ${props => getButtonHoverStyle(props.buttonType, props.theme, props.isLoading)}
  }
  &:focus {
    outline: none;
  }
`;

export const StyledCounter = styled(Counter)`
  position: absolute;
  top: -2px;
  right: -2px;
  z-index: 10;
`;

type IconContainerProps = {
  hasText: boolean;
  iconColor?: string;
};
export const IconContainer = styled.div<IconContainerProps>`
  ${props => props.hasText ? `
    margin-right: ${Padding.s};
  ` : undefined}
  display: flex;
  align-items: center;
  justify-content: center;
`;

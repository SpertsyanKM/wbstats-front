import React, {MouseEventHandler} from 'react';

export enum ButtonSize {
  S,
  M,
  L,
}

export enum ButtonType {
  Primary,
  Secondary,
  Tertiary,
}

export enum ButtonTheme {
  Default,
  Bright,
}

export type ButtonFunctionalProps = {
  label?: string;
  icon?: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  enabled?: boolean;
  count?: number;
  isLoading?: boolean;
};

export type ButtonProps = ButtonFunctionalProps & {
  size?: ButtonSize;
  buttonType?: ButtonType;
  className?: string;
  noVerticalPadding?: boolean;
  theme?: ButtonTheme;
};

import React, {MouseEventHandler} from 'react';
import {ButtonProps, ButtonSize, ButtonTheme, ButtonType} from './types';
import {IconContainer, StyledButton, StyledCounter} from './buttonStyles';
import Loader from '../loader';
import {LoaderSize} from '../loader/types';

const Button: React.FC<ButtonProps> = ({
  onClick: onClickHandler,
  size = ButtonSize.M,
  buttonType = ButtonType.Primary,
  label,
  icon,
  className,
  enabled = true,
  isLoading = false,
  count,
  noVerticalPadding,
  theme = ButtonTheme.Default,
}) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = event => {
    onClickHandler(event);
    event.stopPropagation();
  };

  return (
    <StyledButton
      as="button"
      buttonType={buttonType}
      hasText={!!label}
      size={size}
      onClick={enabled && !isLoading ? onClick : undefined}
      className={className}
      noVerticalPadding={noVerticalPadding}
      theme={theme}
      isLoading={isLoading}
    >
      {isLoading ? (
        <Loader size={size === ButtonSize.L ? LoaderSize.M : LoaderSize.S}/>
      ) : (
        <>
          {icon && <IconContainer hasText={!!label}>{icon}</IconContainer>}
          {label}
          {!!count && <StyledCounter count={count}/>}
        </>
      )}
    </StyledButton>
  );
};

export default Button;

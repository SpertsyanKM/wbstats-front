import React, {ChangeEventHandler, useState} from 'react';
import {Container, ErrorText, StyledInput, StyledMaskedInput} from './inputStyles';
import {TypographyConfigOptional, TypographySize, TypographyTheme, TypographyWeight} from '../styling';

type Props = TypographyConfigOptional & {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  customStateManagement?: boolean;
  type?: string;
  mask?: string;
  errorMessage?: string;
};

const Input: React.FC<Props> = ({
  theme,
  size,
  weight,
  placeholder,
  className,
  value,
  onChange,
  customStateManagement,
  type,
  mask,
  errorMessage,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const onValueChange: ChangeEventHandler<HTMLInputElement> = event => {
    setInputValue(event.target.value);
    onChange?.(event.target.value);
  };

  const commonProps = {
    config: {
      theme: theme ?? TypographyTheme.Secondary,
      size: size ?? TypographySize.S,
      weight: weight ?? TypographyWeight.Medium,
    },
    isError: !!errorMessage,
    value: customStateManagement ? value : inputValue,
    placeholder,
    type,
    onChange: onValueChange
  }

  const InputComponent = !!mask ? (
    <StyledMaskedInput
      {...commonProps}
      mask={mask}
    />
  ) : (
    <StyledInput
      {...commonProps}
    />
  );
  
  return (
    <Container className={className}>
      {InputComponent}
      {!!errorMessage && <ErrorText>{errorMessage}</ErrorText>} 
    </Container>
  );
};

export default Input;

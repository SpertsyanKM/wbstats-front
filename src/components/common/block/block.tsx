import {BlockSize} from './types';
import React from 'react';
import {Container} from './blockStyles';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: BlockSize;
  className?: string;
  children?: React.ReactNode;
  root?: boolean;
};

const Block: React.FC<Props> = ({
  size,
  className,
  children,
  root,
  ...rest
}) => (
  <Container
    root={!!root}
    size={!!root || !size ? BlockSize.S12 : size}
    className={className}
    {...rest}
  >
    {children}
  </Container>
);

export default Block;

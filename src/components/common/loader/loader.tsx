import React from 'react';
import {LoaderSize} from './types';
import {AbsoluteContainer, Container, Square} from './loaderStyles';
import {SquareCountInAColumn, SquareCountInARow} from './constants';

type Props = {
  size?: LoaderSize;
  root?: boolean;
  absolute?: boolean;
  className?: string;
};

const Loader: React.FC<Props> = ({size, root = false, absolute = false, className}) => {
  if (size === undefined) {
    size = root ? LoaderSize.XL : LoaderSize.S;
  }
  const squares = [];
  for (let i = 0; i < SquareCountInAColumn; ++i) {
    for (let j = 0; j < SquareCountInARow; ++j) {
      squares.push((
        <Square size={size} row={i} column={j} key={'' + i + j}/>
      ));
    }
  }

  const loader = (
    <Container size={size} root={root} absolute={absolute} className={className}>
      {squares}
    </Container>
  );
  return absolute ? (
    <AbsoluteContainer>{loader}</AbsoluteContainer>
  ) : loader;
};

export default Loader;

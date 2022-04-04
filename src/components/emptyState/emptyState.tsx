import React from 'react';
import {Container, Text} from './emptyStateStyles';

type Props = {
  text: string;
};

const EmptyState: React.FC<Props> = ({text}) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

export default EmptyState;

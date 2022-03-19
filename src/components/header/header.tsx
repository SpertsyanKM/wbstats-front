import React from 'react';
import {Container, MenuContainer, Row} from './headerStyles';
import NavigationButtons from '../navigationButtons';

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <Container root>
      <Row>
        <MenuContainer>
          <NavigationButtons />
        </MenuContainer>
      </Row>
    </Container>
  );
};

export default Header;

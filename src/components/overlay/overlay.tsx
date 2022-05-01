import React from 'react';
import {Container, Content} from './overlayStyles';

type Props = {
  isVisible: boolean;
  closable: boolean;
  onClose?: () => void;
};

const Overlay: React.FC<Props> = ({isVisible, onClose, closable, children}) => {
  return (
    <Container visible={isVisible} onClick={onClose}>
      <Content onClick={(event) => event.stopPropagation()}>
        {children}
      </Content>
    </Container>
  );
};

export default Overlay;

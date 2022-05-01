import styled from 'styled-components';
import {Color, Padding} from '../common/styling';

const ANIMATION_DURATION = '.25';

type OverlayProps = {
  visible: boolean;
}

export const Container = styled.div<OverlayProps>`
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: opacity ${ANIMATION_DURATION}s ease, visibility ${ANIMATION_DURATION}s ease;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 500;
  background-color: ${Color.DarkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background-color: ${Color.White};
  padding: ${Padding.l};
  position: relative;
`;

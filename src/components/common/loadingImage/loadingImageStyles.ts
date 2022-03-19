import styled from 'styled-components';
import Loader from '../loader';
import {LoaderSize} from '../loader/types';

type AspectRatioProps = {
  aspectRatio?: number;
}
export const Container = styled.div<AspectRatioProps>`
  position: relative;
  width: 100%;
  ${props => props.aspectRatio ? `
    padding-bottom: ${props.aspectRatio * 100}%;
  ` : undefined}
`;

type ImageProps = {
  aspectRatio?: number;
}
export const Image = styled.img<ImageProps>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  object-fit: cover;
`;

export const StyledLoader = styled(Loader).attrs({
  size: LoaderSize.L,
})``;

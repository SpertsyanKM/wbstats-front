import React from 'react';
import {Container, Image, StyledLoader} from './loadingImageStyles';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  aspectRatio?: number;
};

const LoadingImage: React.FC<Props> = ({className, aspectRatio, ...imgProps}) => {
  return (
    <Container className={className} aspectRatio={aspectRatio}>
      <StyledLoader absolute />
      <Image loading="lazy" aspectRatio={aspectRatio} {...imgProps} />
    </Container>
  );
};

export default LoadingImage;

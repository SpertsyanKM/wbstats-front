import {LoaderSize} from './types';
import styled, {keyframes} from 'styled-components';
import {RootLoaderHeight, SquareCountInAColumn, SquareCountInARow} from './constants';

type ContainerProps = {
  size: LoaderSize;
  absolute: boolean;
  root: boolean;
};

const SquareSize = {
  [LoaderSize.S]: 4,
  [LoaderSize.M]: 8,
  [LoaderSize.L]: 12,
  [LoaderSize.XL]: 50,
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  align-content: center;
  width: ${props => SquareSize[props.size] * SquareCountInARow}px; 
  height: ${props => Math.max(props.root ? RootLoaderHeight : 0, SquareSize[props.size] * SquareCountInAColumn)}px;
  ${props => props.absolute 
    ? `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    ` : undefined} 
`;

const ScaleAnimation = keyframes`
  0% {
    transform: scale(1.0);
  }
  20% {
    transform: scale(1.0);
  }
  50% {
    transform: scale(0.1);
  }
  80% {
    transform: scale(1.0);
  }
  100% {
    transform: scale(1.0);
  }
`;

const AnimationDurationSec = 0.8;

type SquareProps = {
  size: LoaderSize;
  row: number;
  column: number;
};

export const Square = styled.div<SquareProps>`
  display: block;
  width: ${props => SquareSize[props.size]}px;
  height: ${props => SquareSize[props.size]}px;
  background-color: ${props => getSquareBackgroundColor(props.row, props.column)};
  animation: ${ScaleAnimation} ${AnimationDurationSec}s linear infinite;
  animation-delay: ${props => getAnimationDelay(props.row, props.column)}s;
`;

const SquareColors = ['#DB8074', '#DB5F4F', '#B62D1B', '#893B31', '#761509'];

type SquareBackgroundColorGetter = (row: number, column: number) => string;

const getSquareBackgroundColor: SquareBackgroundColorGetter = (row, column) => {
  return SquareColors[(row + column) % SquareColors.length];
};

type AnimationDelayGetter = (row: number, column: number) => number;

const getAnimationDelay: AnimationDelayGetter = (row, column) => {
  const maxDelay = AnimationDurationSec / 2.0;
  const maxIndex = SquareCountInARow + SquareCountInAColumn - 2;
  const currentIndex = row + column;
  return maxDelay * (currentIndex / maxIndex);
};

import {Action} from 'redux';
import {Box, BoxGood} from './types';

export const ACTION_ADD_BOX = 'ACTION_ADD_BOX';
export type ActionAddBox = Action<typeof ACTION_ADD_BOX>;
export const addBox = (): ActionAddBox => ({
  type: ACTION_ADD_BOX,
});

export const ACTION_ADD_BOXES = 'ACTION_ADD_BOXES';
export type ActionAddBoxes = Action<typeof ACTION_ADD_BOXES> & {count: number};
export const addBoxes = (count: number): ActionAddBoxes => ({
  type: ACTION_ADD_BOXES,
  count,
});

export const ACTION_REMOVE_BOX = 'ACTION_REMOVE_BOX';
export type ActionRemoveBox = Action<typeof ACTION_REMOVE_BOX> & {box: Box};
export const removeBox = (box: Box): ActionRemoveBox => ({
  type: ACTION_REMOVE_BOX,
  box,
});

export const ACTION_REMOVE_ALL_BOXES = 'ACTION_REMOVE_ALL_BOXES';
export type ActionRemoveAllBoxes = Action<typeof ACTION_REMOVE_ALL_BOXES>;
export const removeAllBoxes = (): ActionRemoveAllBoxes => ({
  type: ACTION_REMOVE_ALL_BOXES,
});

export const ACTION_SET_GOOD_TO_BOX = 'ACTION_SET_GOOD_TO_BOX';
export type ActionSetGoodToBox = Action<typeof ACTION_SET_GOOD_TO_BOX> & {
  box: Box;
  good: BoxGood;
};
export const setGoodToBox = (
  box: Box,
  good: BoxGood,
): ActionSetGoodToBox => ({
  type: ACTION_SET_GOOD_TO_BOX,
  box,
  good,
});

export const ACTION_REMOVE_BOX_GOOD = 'ACTION_REMOVE_BOX_GOOD';
export type ActionRemoveBoxGood = Action<typeof ACTION_REMOVE_BOX_GOOD> & {good: BoxGood; box: Box};
export const removeBoxGood = (good: BoxGood, box: Box): ActionRemoveBoxGood => ({
  type: ACTION_REMOVE_BOX_GOOD,
  good,
  box,
});

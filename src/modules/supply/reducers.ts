import {Box} from './types';
import {
  ACTION_ADD_BOX,
  ACTION_REMOVE_BOX, ACTION_REMOVE_BOX_GOOD,
  ACTION_SET_GOOD_TO_BOX,
  ActionAddBox,
  ActionRemoveBox, ActionRemoveBoxGood,
  ActionSetGoodToBox
} from './actions';
import {combineReducers} from 'redux';

const newSupplyBoxes = (
  state: Box[] = [],
  action: ActionAddBox | ActionRemoveBox | ActionSetGoodToBox | ActionRemoveBoxGood,
): Box[] => {
  if (action.type === ACTION_ADD_BOX) {
    const box: Box = {
      index: state.length,
      barcode: "",
      goods: [],
    };
    state = [...state, box];
  } else if (action.type === ACTION_REMOVE_BOX) {
    state.splice(action.box.index, 1);
    state.forEach((box, index) => box.index = index);
    state = [...state];
  } else if (action.type === ACTION_SET_GOOD_TO_BOX) {
    const box = action.box;
    const goodIndex = box.goods.findIndex(good => good.goodId === action.good.goodId);
    if (goodIndex >= 0) {
      box.goods.splice(goodIndex, 1, action.good);
      box.goods = [...box.goods];
    } else {
      box.goods = [...box.goods, action.good];
    }

    state.splice(box.index, 1, box);
    state = [...state];
  } else if (action.type === ACTION_REMOVE_BOX_GOOD) {
    const box = action.box;
    const goodIndex = box.goods.findIndex(good => good.goodId === action.good.goodId);
    if (goodIndex >= 0) {
      box.goods.splice(goodIndex, 1)
    }
    box.goods = [...box.goods];
    state.splice(box.index, 1, box);
    state = [...state];
  }

  return state;
}

export const supplies = combineReducers({
  newSupplyBoxes,
});

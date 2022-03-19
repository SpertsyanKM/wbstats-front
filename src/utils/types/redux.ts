import {Store as ReduxStore, AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppState} from "Types";

export type Store = ReduxStore<AppState> & {dispatch: Dispatch};
export type GetState = () => AppState;
export type Reducer<State, Actions> = (
  state: State | undefined,
  action: Actions,
) => State;

export type Selector<Type> = (state: AppState) => Type;
export type Dispatch = ThunkDispatch<AppState, unknown, AnyAction>;
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;

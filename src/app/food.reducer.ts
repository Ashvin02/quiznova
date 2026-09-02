import { createReducer, on } from '@ngrx/store';
import { addFood } from './food.actions';

export interface FoodState {
  foods: string[];
}

export const initialState: FoodState = {
  foods: []
};

export const foodReducer = createReducer(
  initialState,
  on(addFood, (state, { food }) => ({
    ...state,
    foods: [...state.foods, food]
  }))
);

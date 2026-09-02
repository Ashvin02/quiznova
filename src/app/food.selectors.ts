import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FoodState } from './food.reducer';

export const selectFoodState = createFeatureSelector<FoodState>('food');

export const selectFoods = createSelector(
  selectFoodState,
  state => state.foods
);

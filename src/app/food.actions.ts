import { createAction, props } from '@ngrx/store';

export const addFood = createAction(
  '[Food] Add Food',
  props<{ food: string }>()
);

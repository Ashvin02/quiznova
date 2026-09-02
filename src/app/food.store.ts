// food.store.ts — remplace les deux fichiers
import { createStore, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FoodState {
  foods: string[];
}

const foodStore = createStore(
  { name: 'food' },
  withProps<FoodState>({ foods: [] })
);

@Injectable({ providedIn: 'root' })
export class FoodQuery {
  foods$: Observable<string[]> = foodStore.pipe(
    map(state => state.foods)
  );

  addFood(food: string) {
    foodStore.update(state => ({ foods: [...state.foods, food] }));
  }
}
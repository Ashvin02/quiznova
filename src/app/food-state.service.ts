import { Injectable } from '@angular/core';
import { FoodQuery } from './food.store';

@Injectable({ providedIn: 'root' })
export class FoodStateService {
  constructor(private foodQuery: FoodQuery) {}

  addFood(food: string) {
    this.foodQuery.addFood(food);
  }
}
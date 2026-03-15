import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, of, take, map, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foods = ["Pizza", "Sushi", "Burger", "Pasta", "Salad", "Tacos", "Ramen", "Curry", "Steak", "Ice Cream"];
  private foodSubject = new Subject<string>();

  constructor(private http: HttpClient) { }
  getfact(): Observable<any> {
    return this.http.get('https://catfact.ninja/fact');
  }
  getAllFoods(): Observable<string[]> {
    return of(this.foods);
  }
  getFoodsOneByOne(): Subject<string> {
    return this.foodSubject;
  }
  emitFoods() {
    this.foods.forEach((food, index) => {
      setTimeout(() => {
        this.foodSubject.next(food);
        if (index === this.foods.length - 1) {
          this.foodSubject.complete();
        }
      }, index * 1000); // Émet un aliment toutes les secondes
    });
  }
}
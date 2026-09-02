import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, of, take, map, Subject, from, filter, delay, concatMap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foods = ["Pizza", "Sushi", "Burger", "Pasta", "Salad", "Tacos", "Ramen", "Curry", "Steak", "Ice Cream"];
  private foodSubject = new Subject<string>();
  private foodState = new BehaviorSubject<string[]>(this.foods);
  foodsState$ = this.foodState.asObservable();

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
  testMapFilter() {
    return of(this.foods).pipe(
      delay(0),
      map(list => list.map(f => f.toUpperCase())),
      map(list => list.filter(f => f.startsWith('P')))
    );    
  }
  addFood(newfood: string) {
    const current = this.foodState.value;
    this.foodState.next([...current, newfood]);
  }
}
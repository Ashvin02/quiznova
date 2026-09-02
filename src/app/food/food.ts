import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodStateService } from '../food-state.service';
import { FoodQuery } from '../food.store';
import { Store } from '@ngrx/store';
import { addFood } from '../food.actions';
import { selectFoods } from '../food.selectors';

@Component({
  selector: 'app-food',
  imports: [AsyncPipe, CommonModule, NgForOf, NgIf, FormsModule],
  standalone: true,
  templateUrl: './food.html',
  styleUrl: './food.css'
})
export class Food implements OnInit {
  // ✅ Injection via inject() — plus de constructor injection
  private service = inject(FoodService);
  private cdr = inject(ChangeDetectorRef);
  private foodState = inject(FoodStateService);
  private foodQuery = inject(FoodQuery);
  private store = inject(Store);

  fact$: Observable<any> = this.service.getfact();
  allFoods: string[] = [];
  streamedFoods: string[] = [];
  loadingMessage: string = '';
  foods$!: Observable<any>;
  foodsFromStore$!: Observable<any>;
  foodsAkita$!: Observable<any>;
  foodsNgRx$!: Observable<any>;
  newFood = '';

  addFood() {
    if (!this.newFood.trim()) return;
    this.service.addFood(this.newFood.trim());
    this.newFood = '';
  }

  addFoodAkita() {
    if (!this.newFood.trim()) return;
    this.foodState.addFood(this.newFood.trim());
    this.newFood = '';
  }

  addFoodNgRx() {
    if (!this.newFood.trim()) return;
    this.store.dispatch(addFood({ food: this.newFood.trim() }));
    this.newFood = '';
  }

  fetchFood() {
    this.fact$ = this.service.getfact();
  }

  loadAll() {
    this.service.getAllFoods().subscribe(list => {
      this.allFoods = list;
    });
  }

  loadOneByOne() {
    this.streamedFoods = [];
    this.loadingMessage = '';
    this.service.emitFoods();
    this.service.getFoodsOneByOne().subscribe({
      next: (food) => {
        this.streamedFoods.push(food);
        this.cdr.detectChanges();
      },
      complete: () => {
        this.loadingMessage = 'Chargement terminé !';
        alert('Chargement terminé !');
        this.cdr.detectChanges();
      }
    });
    this.foods$ = this.service.testMapFilter();
    this.foodsFromStore$ = this.service.foodsState$;
    this.foodsAkita$ = this.foodQuery.foods$;
    this.foodsNgRx$ = this.store.select(selectFoods);
  }

  ngOnInit() {
    this.loadOneByOne();
    this.loadAll();
    this.foods$ = this.service.testMapFilter();
    this.foodsFromStore$ = this.service.foodsState$;
    this.foodsAkita$ = this.foodQuery.foods$;
    this.foodsNgRx$ = this.store.select(selectFoods);
  }
}
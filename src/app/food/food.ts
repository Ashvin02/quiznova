import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FoodService } from '../food.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-food',
  imports: [AsyncPipe, CommonModule],
  standalone: true,
  templateUrl: './food.html',
  styleUrl: './food.css'
})
export class Food {
  fact$ : Observable <any>;
  allFoods: string[] = [];
  streamedFoods: string[] = [];
  loadingMessage: string = '';

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
}
  constructor(private service: FoodService, private cdr : ChangeDetectorRef) {
  this.fact$ = this.service.getfact();
  }
}



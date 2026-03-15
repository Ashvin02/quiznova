import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, catchError, of, Observable, firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {

  private apiKey = environment.weatherApiKey;
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  // Log pour vérifier la clé utilisée
  constructor(private http: HttpClient) {
    console.log('Clé API utilisée :', this.apiKey);
  }

  // Ville sélectionnée (Paris par défaut)
  private citySubject = new BehaviorSubject<string>('Paris');
  city$ = this.citySubject.asObservable();

  // Observable météo réactif
  weather$: Observable<any> = this.city$.pipe(
    switchMap(city =>
      this.http.get(
        `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`
      ).pipe(
        catchError(err => {
          console.error('Erreur météo :', err);
          return of(null);
        })
      )
    )
  );

  // Permet de changer la ville
  setCity(city: string) {
    this.citySubject.next(city);
  }

  // Version Promise (pour ton test dans home.ts)
  getWeatherPromise(city: string): Promise<any> {
    return firstValueFrom(
      this.http.get(
        `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`
      )
    );
  }
}

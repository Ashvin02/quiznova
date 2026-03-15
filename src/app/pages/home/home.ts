import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScoreService } from '../../services/score.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.html',
})
export class Home {
  playerName: string = '';
  playerName$: any;
  currentUser$: Observable<User | null>;
  weather$: Observable<any>;

  constructor(
    private router: Router,
    private scoreService: ScoreService,
    private auth: AuthService,
    private weather: WeatherService
  ) {
    this.currentUser$ = this.auth.currentUser$;
    this.weather$ = this.weather.weather$;
    this.playerName$ = this.scoreService.playerName$;
    this.loadWeather();
  }

  startQuiz(): void {
    if (this.playerName.trim()) {
      this.scoreService.setPlayerName(this.playerName);
      this.router.navigate(['/quiz']);
    } else {
      alert('Veuillez entrer votre nom avant de commencer.');
    }
  }

  startQuizAsUser(firstName: string | undefined, lastName: string | undefined): void {
    const fullName = `${firstName ?? ''} ${lastName ?? ''}`.trim();
    this.scoreService.setPlayerName(fullName);
    this.router.navigate(['/quiz']);
  }

  changeCity(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.weather.setCity(value);
  }

  async loadWeather() {
    try {
      const meteo = await this.weather.getWeatherPromise('Paris');
      console.log('Météo via Promise : ', meteo);
    } catch (err) {
      console.error('Erreur météo Promise : ', err);
    }
  }
}

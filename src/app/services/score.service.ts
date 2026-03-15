import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScoreModels } from '../models/score';

@Injectable({ providedIn: 'root' })
export class ScoreService {

  private storageKey = 'quiznova-leaderboard';

  // Nom du joueur (réactif)
  private playerNameSubject = new BehaviorSubject<string>('');
  playerName$ = this.playerNameSubject.asObservable();

  // Dernier score (réactif)
  private lastScoreSubject = new BehaviorSubject<number>(0);
  lastScore$ = this.lastScoreSubject.asObservable();

  constructor() {}

  // --- PLAYER NAME ---
  setPlayerName(name: string): void {
    this.playerNameSubject.next(name);
  }

  getPlayerName(): string {
    return this.playerNameSubject.value;
  }

  // --- LAST SCORE ---
  setLastScore(score: number): void {
    this.lastScoreSubject.next(score);
  }

  getLastScore(): number {
    return this.lastScoreSubject.value;
  }

  // --- LEADERBOARD ---
  addToLeaderboard(score: ScoreModels): void {
    const current = this.getLeaderboard();
    current.push(score);
    localStorage.setItem(this.storageKey, JSON.stringify(current));
  }

  getLeaderboard(): ScoreModels[] {
    const raw = localStorage.getItem(this.storageKey);
    const list: ScoreModels[] = raw ? JSON.parse(raw) : [];

    const withDates = list.map(s => ({
      ...s,
      date: new Date(s.date)
    }));

    withDates.sort((a, b) => b.points - a.points);

    return withDates;
  }
}

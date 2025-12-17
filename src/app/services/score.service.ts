import { Injectable } from '@angular/core';
import { ScoreModel } from '../models/score';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  private lastScore = 0;
  private playerName = 'Anonyme';
  private storageKey = 'quiznova-leaderboard';

  setLastScore(score: number): void {
    this.lastScore = score;
  }

  getLastScore(): number {
    return this.lastScore;
  }

  setPlayerName(name: string): void {
    this.playerName = name;
  }

  getPlayerName(): string {
    return this.playerName;
  }

  addToLeaderboard(score: ScoreModel): void {
    const current = this.getLeaderboard();
    current.push(score);
    localStorage.setItem(this.storageKey, JSON.stringify(current));
  }

  getLeaderboard(): ScoreModel[] {
    const raw = localStorage.getItem(this.storageKey);
    const list: ScoreModel[] = raw ? JSON.parse(raw) : [];
    return list.map(s => ({ ...s, date: new Date(s.date) }));
  }
}

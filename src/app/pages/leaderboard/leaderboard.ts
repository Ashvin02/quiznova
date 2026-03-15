import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ScoreService } from '../../services/score.service';
import { ScoreModels } from '../../models/score';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, RouterLinkActive],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.css']
})
export class Leaderboard {
  scores: ScoreModels[] = [];
  score: any;
  playerName$: any;

  constructor(private scoreService: ScoreService) {
    this.playerName$ = this.scoreService.playerName$;
    this.scores = this.scoreService.getLeaderboard();
  }
}


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScoreService } from '../../services/score.service';
import { ScoreModel } from '../../models/score';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.css']
})
export class Leaderboard {
  scores: ScoreModel[] = [];
  score: any;

  constructor(private scoreService: ScoreService) {
    this.scores = this.scoreService.getLeaderboard();
  }
}


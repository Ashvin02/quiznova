import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScoreService } from '../../services/score.service';
@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterModule],
  templateUrl: './result.html',
  styleUrls: ['./result.css']
})
export class Result {
  score = 0;
  playerName: string = '';

  constructor(private scoreService: ScoreService) {
    this.score = this.scoreService.getLastScore();
  }

  saveScore(): void {
    if (this.playerName.trim()) {
      this.scoreService.setPlayerName(this.playerName);
      this.scoreService.addToLeaderboard({
        player: this.playerName,
        points: this.score,
        date: new Date()
      });
      alert('Score enregistré avec succès 🎉');
    } else {
      alert('Veuillez entrer votre nom avant d’enregistrer le score.');
    }
  }
}

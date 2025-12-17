import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScoreService } from '../../services/score.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home{
  playerName: string = '';

  constructor(private router: Router, private scoreService: ScoreService) {}

  startQuiz(): void {
    if (this.playerName.trim()) {
      this.scoreService.setPlayerName(this.playerName);
      this.router.navigateByUrl('/quiz');
    } else {
      alert('Veuillez entrer votre nom avant de commencer.');
    }
  }
}

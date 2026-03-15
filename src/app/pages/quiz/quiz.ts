import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz';
import { ScoreService } from '../../services/score.service';
import { Question } from '../../models/question';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css'],
  animations: [
    trigger('fadeTheme', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('600ms ease', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class Quiz implements OnInit, OnDestroy {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 10;
  timerSub?: Subscription;
  answered = false;
  totalTime = 20; // Temps total par question en secondes
selectedOption: any;
selectedOptionIndex: any;
answerValidated: any;

  constructor(
    private quizService: QuizService,
    private scoreService: ScoreService,
    private router: Router,
    private cdr : ChangeDetectorRef
  ) {}

  getThemeClass(theme: string | undefined): string {
    switch (theme?.toLowerCase()) {
      case 'culture générale':
        return 'general';
      case 'mathématiques':
        return 'mathématiques';
      case 'informatique':
        return 'informatique';
      case 'histoire':
        return 'histoire';
      case 'arts & culture':
        return 'arts-culture';
      case 'sport':
        return 'sport';
      default:
        return 'default';
    }
  }

  ngOnInit(): void {
    this.questions = this.quizService.getQuestions();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
    this.stopTimer();
    this.timeLeft = this.totalTime;
    this.timerSub = interval(1000).subscribe(() => {
      this.timeLeft--;
      this.cdr.detectChanges(); // Forcer la détection des changements pour mettre à jour l'affichage du timer
      if (this.timeLeft <= 0) {
        this.onTimeout();
      }
    });
  }
  

  stopTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = undefined;
    }
  }

  onTimeout(): void {
    this.answered = true;
    this.nextQuestion();
  }

  selectAnswer(optionIndex: number): void {
    if (this.answered) return;
    this.selectedOptionIndex = optionIndex;
  }
  
  validateAnswer(): void {
    if (this.selectedOptionIndex === null) return;
  
    const q = this.questions[this.currentQuestionIndex];
  
    if (this.selectedOptionIndex === q.correctAnswer) {
      this.score++;
      this.answerValidated = 'correct';
    } else {
      this.answerValidated = 'wrong';
    }
  
    this.answered = true;
  
    // ⏱ attendre 1 seconde avant de passer à la question suivante
    setTimeout(() => {
      this.nextQuestion();
      this.answerValidated = null;
      this.selectedOptionIndex = null;
    }, 1000);
  }
  
  nextQuestion(): void {
    this.stopTimer();
    this.currentQuestionIndex++;
    this.answered = false;

    if (this.currentQuestionIndex < this.questions.length) {
      this.startTimer();
    } else {
      // ✅ Sauvegarde du score final
      this.scoreService.setLastScore(this.score);
      this.scoreService.addToLeaderboard({
        player: this.scoreService.getPlayerName(),          // tu peux remplacer par un champ input joueur
        points: this.score,
        date: new Date()
      });

      // ✅ Redirection vers la page des résultats
      this.router.navigateByUrl('/result');
    }
  }
}


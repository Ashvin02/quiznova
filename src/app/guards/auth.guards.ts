import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ScoreService } from '../services/score.service';

export const scoreGuard: CanActivateFn = () => {
  const scoreService = inject(ScoreService);
  const router = inject(Router);

  // ✅ Vérifie si un score est enregistré
  if (scoreService.getLastScore() > 0) {
    return true; // accès autorisé
   } else {
    alert('Veuillez terminer un quiz et enregistrer votre score avant de voir le classement.');
    router.navigateByUrl('/home'); // redirection vers l’accueil
    return false;
  }
};

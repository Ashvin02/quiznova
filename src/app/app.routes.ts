import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Quiz } from './pages/quiz/quiz';
import { Result } from './pages/result/result';
import { Leaderboard } from './pages/leaderboard/leaderboard';
import { scoreGuard } from './guards/auth.guards';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './auth/auth.guard';
import { reverseAuthGuard } from './auth/auth-reverse.guard';
import { Food } from './food/food';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'quiz', component: Quiz, canActivate: [authGuard] },
  { path: 'result', component: Result, canActivate: [authGuard] },
  { path: 'leaderboard', component: Leaderboard },
  { path: 'login', component: Login, canActivate: [reverseAuthGuard]},
  { path: 'register', component: Register, canActivate: [reverseAuthGuard]},
  { path: 'food', component: Food },
  { path: '**', redirectTo: 'login' }
];
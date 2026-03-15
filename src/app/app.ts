import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from "./footer/footer";
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, Footer,],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  currentUser$: Observable<User | null>;

  constructor(private router: Router, private auth: AuthService) {
    this.currentUser$ = this.auth.currentUser$;
  }

  isLogged(): boolean {
    return !!localStorage.getItem('isLogged');
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

toggleTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}



import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  form;
  showPassword = false;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.errorMessage = '';

    if (this.form.invalid) {
    }

    const { email, password } = this.form.value;

    const success = this.auth.login(email!, password!);

    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Email ou mot de passe incorrect.';
    }
  }
}

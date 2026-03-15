import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  form: FormGroup;
  passwordStrength = 'weak';

  rules = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  };

  hasInput = false;

constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(12)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
        address: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const pwd = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pwd === confirm ? null : { mismatch: true };
  }

  checkStrength() {
    const pwd = this.form.get('password')?.value || '';
    this.hasInput = pwd.length > 0;

    this.rules.minLength = pwd.length >= 12;
    this.rules.uppercase = /[A-Z]/.test(pwd);
    this.rules.lowercase = /[a-z]/.test(pwd);
    this.rules.number = /[0-9]/.test(pwd);
    this.rules.special = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    const score = Object.values(this.rules).filter(v => v).length;

    if (score <= 2) {
      this.passwordStrength = 'weak';
    } else if (score <= 4) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'strong';
    }
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.register(this.form.value);

    console.log('Formulaire valide', this.form.value);
    this.router.navigate(['/home']);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'access_token';

  loginFake() {
    const fakeToken = 'FAKE_JWT_TOKEN_123456';
    localStorage.setItem(this.TOKEN_KEY, fakeToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

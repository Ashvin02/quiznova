import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  private currentUserSubject = new BehaviorSubject<User | null>(this.loadCurrentUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  private loadCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
  }

  private loadUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  register(data: User) {
    const users = this.loadUsers();
    const newUser = { ...data, id: Date.now() };

    users.push(newUser);
    this.saveUsers(users);

    this.loginUser(newUser);
  }

  login(email: string, password: string): boolean {
    const users = this.loadUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return false;

    this.loginUser(user);
    return true;
  }

  private loginUser(user: User) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
    this.currentUserSubject.next(null);
  }

  isLogged(): boolean {
    return this.currentUserSubject.value !== null;
  }
}

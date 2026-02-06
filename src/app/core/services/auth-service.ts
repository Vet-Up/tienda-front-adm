import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { BehaviorSubject, catchError, Observable, of, pipe, tap, timeout } from 'rxjs';
import { ILogin, ILoginResponse } from '../models/i-login';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private TOKEN_KEY = 'auth_token_admin';
  private Observableuserv = new BehaviorSubject<IUser|null>(null);
  public user$ = this.Observableuserv.asObservable();
  private tokenVerified = false;
  constructor(private httpService: HttpService) {
  }
  private apiUrl = '/api/auth/login/ADMIN';

  login(username: string, password: string): Observable<ILoginResponse> {
    return this.httpService.post<ILoginResponse>(this.apiUrl, { username, password })
    .pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);

        }
      })
    );
  }

  validateToken(token: string): Observable<IUser | null> {
    if (this.tokenVerified) {
      const user = this.getUser();
      if (user) {
        return of(user);
      }else {
        return of(null);
      }
    }
    this.tokenVerified = true;
    return this.httpService.get<IUser>('/api/auth/validate').pipe(
      timeout(5000),
      catchError((error) => {
        this.tokenVerified = false;
        console.error('Error al validar el token:', error);
        return of(null);
      }),
    );
  }

  setUser(user: IUser): void {
    this.Observableuserv.next(user);
  }

  getUser():IUser|null {
    return this.Observableuserv.value;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }



  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.Observableuserv.next(null);
    this.tokenVerified = false;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Login } from 'src/app/models/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly token: string = 'token';

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: Login) {
    return this.http.post<any>(`${environment.apiUrl}/login`, usuario)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem(AuthService.token, token);
        })
      );
  }

  logout() {
    localStorage.removeItem(AuthService.token);
  }

  public static get tokenValue() {
    return localStorage.getItem(AuthService.token);
  }
}

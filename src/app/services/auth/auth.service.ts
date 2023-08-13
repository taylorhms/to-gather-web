import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Login } from 'src/app/models/login';
import { UsuarioToken } from 'src/app/models/usuario-token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly token: string = 'token';
  public static readonly login: string = 'login';

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: Login) {
    return this.http.post<UsuarioToken>(`${environment.apiUrl}/login`, usuario)
      .pipe(
        tap(({ usuarioLogin, token }) => {
          localStorage.setItem(AuthService.token, token);
          localStorage.setItem(AuthService.login, usuarioLogin);
        })
      );
  }

  logout() {
    localStorage.removeItem(AuthService.token);
    localStorage.removeItem(AuthService.login);
  }

  public static get tokenValue() {
    return localStorage.getItem(AuthService.token);
  }

  public static get usuarioLogin() {
    return localStorage.getItem(AuthService.login);
  }
}

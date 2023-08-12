import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NovaConta } from '../models/nova-conta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  novaConta(dados: NovaConta) {
    return this.http.post<any>(`${environment.apiUrl}/usuario`, dados);
  }

  carregar() {
    return this.http.get<any>(`${environment.apiUrl}/usuario`);
  }
}

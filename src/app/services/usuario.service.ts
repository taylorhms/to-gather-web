import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NovaConta } from '../models/nova-conta';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

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
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuario`);
  }

  consultar(id: number) {
    return this.http.get<Usuario>(`${environment.apiUrl}/usuario/${id}`);
  }
}

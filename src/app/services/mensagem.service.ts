import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EnvioMensagem } from '../models/envio-mensagem';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    private http: HttpClient
  ) { }

  enviar(dados: EnvioMensagem) {
    return this.http.post<any>(`${environment.apiUrl}/mensagem`, dados);
  }

  carregar() {
    return this.http.get<any>(`${environment.apiUrl}/mensagem`);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvioMensagem } from 'src/app/models/envio-mensagem';
import { Mensagem } from 'src/app/models/mensagem';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  formEnvio: FormGroup = this.formBuilder.group({
    mensagem: ['', Validators.required]
  });

  mensagens: Mensagem[] = [];
  usuarioLoginAtual: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService
  ) {}

  ngOnInit(): void {
    this.usuarioLoginAtual = AuthService.usuarioLogin;
    this.carregarMensagens();
  }

  enviarMensagem(): void {
    if (this.formEnvio.valid) {
      let mensagem: EnvioMensagem = {
        conteudo: this.formEnvio.get('mensagem')?.value,
        tipo: 'TEXTO',
        loginUsuario: this.usuarioLoginAtual
      };

      this.mensagemService.enviar(mensagem).subscribe({
        next: (response) => {
          this.formEnvio.controls['mensagem'].setValue('');
          this.carregarMensagens();
        },
        error: (erro) => {
          window.alert('Ocorreu um erro ao enviar a mensagem.');
        }
      });
    }
  }

  carregarMensagens() {
    this.mensagemService.carregar().subscribe({
      next: (response: Mensagem[]) => {
        this.mensagens = response;
      }
    })
  }
}

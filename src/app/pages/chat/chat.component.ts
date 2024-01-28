import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvioMensagem } from 'src/app/models/envio-mensagem';
import { Mensagem } from 'src/app/models/mensagem';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  formEnvio: FormGroup = this.formBuilder.group({
    mensagem: ['', Validators.required]
  });

  mensagens: Mensagem[] = [];
  usuarios: { [key: string]: Usuario } = {};
  usuarioLoginAtual: string | null = null;
  usuarioAtual: Usuario | null = null;
  intervalMensagem?: number;
  intervalUsuario?: number;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioLoginAtual = AuthService.usuarioLogin;
    this.carregarMensagens();
    this.carregarUsuarios();
    
    this.intervalMensagem = window.setInterval(()=>{this.carregarMensagens()}, 1500);
    this.intervalUsuario = window.setInterval(()=>{this.carregarUsuarios()}, 10000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.intervalMensagem);
    window.clearInterval(this.intervalUsuario);
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

  carregarMensagens(): void {
    this.mensagemService.carregar().subscribe({
      next: (responseMensagens: Mensagem[]) => {
        let precisaAtualizar: boolean = false;

        responseMensagens.forEach(msg => {
          if (!(msg.loginAutor in this.usuarios)) {
            precisaAtualizar = true;
          }
        });

        if (precisaAtualizar) {
          this.carregarUsuarios(responseMensagens);
        } else {
          this.listarMensagens(responseMensagens);
        }
      }
    });
  }

  carregarUsuarios(novasMensagens?: Mensagem[]): void {
    this.usuarioService.carregar().subscribe({
      next: (responseUsuarios: Usuario[]) => {
        this.usuarios = {};
        responseUsuarios.forEach(usuario => {
          this.usuarios[usuario.login] = usuario;
          if (usuario.login == this.usuarioLoginAtual) {
            this.usuarioAtual = usuario;
          }
        });
        if (novasMensagens) {
          this.listarMensagens(novasMensagens);
        }
      }
    });
  }

  listarMensagens(novas: Mensagem[]): void {
    novas.forEach(msg => {
      msg.autor = this.usuarios[msg.loginAutor];
    });

    this.mensagens = novas;
  }

  visualizarPerfil(): void {
    this.router.navigate(['perfil', this.usuarioAtual?.id]);
  }
}

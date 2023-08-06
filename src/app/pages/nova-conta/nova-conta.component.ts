import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nova-conta',
  templateUrl: './nova-conta.component.html',
  styleUrls: ['./nova-conta.component.css']
})
export class NovaContaComponent {
  formNovaConta: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    login: ['', Validators.required],
    senha: ['', Validators.required],
    confirmaSenha: ['', Validators.required]
  });

  termosCheck: boolean | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {}

  onSubmit() {
    this.usuarioService.novaConta(this.formNovaConta.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // TODO: Handle errors like if (error.status == 400) ...
        }
      })
  }

  // Facilitar o acesso para validações no formulário

  get nome() {
    return this.formNovaConta.controls['nome'];
  }

  get login() {
    return this.formNovaConta.controls['login'];
  }

  get senha() {
    return this.formNovaConta.controls['senha'];
  }

  get confirmaSenha() {
    return this.formNovaConta.controls['confirmaSenha'];
  }

  senhaIguais(): boolean {
    return this.confirmaSenha.value == this.senha.value;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.css']
})
export class ConfigsComponent implements OnInit {
  loginAtual = AuthService.usuarioLogin;
  idUsuario: number = -1;
  formDados: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.idUsuario = param['login'];

      this.carregarDados();
    });
  }

  carregarDados(): void {
    this.usuarioService.consultar(this.idUsuario).subscribe({
      next: (usuario: Usuario) => {
        // impede de acessar dados de outros usuários
        if (this.idUsuario != usuario.id) {
          this.router.navigate(['']);
        }
        
        this.formDados.patchValue({
          nome: usuario.nome
        });
      }
    });
  }

}

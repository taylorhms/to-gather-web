import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.css']
})
export class ConfigsComponent implements OnInit {
  loginAtual = AuthService.usuarioLogin;
  loginParam: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.loginParam = param['login'];

      // impede de acessar dados de outros usuários
      if (this.loginParam != this.loginAtual) {
        this.router.navigate(['']);
      }
    });
  }

}

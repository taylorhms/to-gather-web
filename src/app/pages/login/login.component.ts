import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup = this.formBuilder.group({
    login: ['', Validators.required],
    senha: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private atuhService: AuthService) {}

  onSubmit() {
    if (this.formLogin.invalid) {
      return;
    }

    this.atuhService
      .login(this.formLogin.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/chat']);
        },
        error: (error) => {
          alert(error);
        }
      });
  }
}

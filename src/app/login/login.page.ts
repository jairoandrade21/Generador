import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService 
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    try {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
  
      await this.authService.login(email, password);
      console.log('Inicio de sesión exitoso');
      // Otro código después del inicio de sesión exitoso...
    } catch (error) {
      console.error('Error en el componente al intentar iniciar sesión:', error);
    }
  }
  
}

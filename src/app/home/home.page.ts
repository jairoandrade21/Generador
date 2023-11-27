import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userName: string;
  welcomeMessage: string;

  constructor(private authService: AuthenticationService, private router: Router) {}


  generarLetraConIA() {
    // Lógica para generar letra con IA
  }

  guardarLetraGenerada() {
    // Lógica para guardar letra generada
  }

  async loadUserInfo() {
    try {
      const user = await this.authService.getProfile();

      if (user?.email) {
        const username = user.email.split('@')[0];
        this.welcomeMessage = `¡Bienvenido, ${username}!`;
      } else {
        this.welcomeMessage = '¡Bienvenido!';
      }
    } catch (error) {
      console.error('Error al obtener la información del usuario', error);
    }
  }

  ngOnInit() {
    this.loadUserInfo();
  }

  async logout() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']);  // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar errores según tus necesidades
    }
  }
}

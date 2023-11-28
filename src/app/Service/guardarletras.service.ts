import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlmacenamientoLetrasService {
  private letrasGuardadas: string[] = [];
  

  guardarLetra(letra: string) {
    this.letrasGuardadas.push(letra);
  }

  obtenerLetrasGuardadas(): string[] {
    return this.letrasGuardadas;
  }
  
}

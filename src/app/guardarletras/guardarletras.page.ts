// guardarletras.page.ts
import { Component } from '@angular/core';
import { GeneradorPage } from '../generador/generador.page';

@Component({
  selector: 'app-guardarletras',
  templateUrl: 'guardarletras.page.html',
  styleUrls: ['guardarletras.page.scss'],
})
export class GuardarLetrasPage {
  constructor(private generadorPage: GeneradorPage) {}

  obtenerLetrasGuardadas(): string[] {
    return this.generadorPage.obtenerLetrasGuardadas();
  }
}
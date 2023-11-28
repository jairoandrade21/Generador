import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { GptService } from '../Service/gpt.service';
import { AlmacenamientoLetrasService } from '../Service/guardarletras.service';


@Component({
  selector: 'app-generador',
  templateUrl: 'generador.page.html',
  styleUrls: ['generador.page.scss'],
})
export class GeneradorPage {
  mensajeUsuario: string = '';
  mensajes: string[] = [];

  constructor(private gptService: GptService, private almacenamientoService: AlmacenamientoLetrasService) {}

  enviarMensaje() {
    const mensaje = `Usuario: ${this.mensajeUsuario}`;
    this.mensajes.push(mensaje);

    this.generarCancionConPreferencia(this.mensajeUsuario);

    this.mensajeUsuario = '';
  }

  generarCancionConPreferencia(preferencia: string) {
    this.gptService.generateSong(preferencia)
      .then(cancionGenerada => {
        const mensajeGenerado = `SpootMusic: ${cancionGenerada}`;
        this.mensajes.push(mensajeGenerado);
      })
      .catch(error => {
        console.error('Error al generar la canción', error);
      });
  }

  guardarLetraGenerada() {
    const ultimaLetra = this.mensajes[this.mensajes.length - 1];
    this.almacenamientoService.guardarLetra(ultimaLetra);
  }

  obtenerLetrasGuardadas(): string[] {
    return this.almacenamientoService.obtenerLetrasGuardadas();
  }
}

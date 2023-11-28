import { Injectable, Inject } from '@angular/core';
import axios from 'axios';
import {AlmacenamientoLetrasService} from "../Service/guardarletras.service"

@Injectable({
  providedIn: 'any'
})
export class GptService {
  private apiKey = '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';
  constructor(private almacenamientoService: AlmacenamientoLetrasService) {}

  generateSong(prompt: string): Promise<string> {
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
  
   
    const data = {
      prompt: `Genera una hermosa canción de amor que incluya los siguientes elementos: ${prompt}.`,
      max_tokens: 500
    };
    
  
    return axios.post(apiUrl, data, { headers })
    .then(response => {
      const cancionGenerada = response.data.choices[0].text;
      this.almacenamientoService.guardarLetra(cancionGenerada);
      return cancionGenerada;
    })
    .catch(error => {
      console.error('Error en la solicitud a la API de GPT', error);
      throw error;
    });
}
  
}

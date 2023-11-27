// src/app/services/gpt.service.ts

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GptService {
  private apiUrl = 'https://platform.openai.com/api-keys'; // Reemplaza con la URL real de la API de GPT
  private apiKey = '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'; // Reemplaza con tu clave de API

  constructor() {}

  generateText(prompt: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    const data = {
      prompt: prompt,
      // Otros parámetros según la documentación de la API de GPT
    };

    return axios.post(this.apiUrl, data, { headers });
  }
}

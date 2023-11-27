// src/app/home/home.page.ts

import { Component } from '@angular/core';
import { GptService } from '../Service/gpt.service';

@Component({
  selector: 'app-generador',
  templateUrl: 'generador.page.html',
  styleUrls: ['generador.page.scss'],
})
export class GeneradorPage {
  generatedText: string;

  constructor(private gptService: GptService) {}

  generateText() {
    const prompt = 'Tu texto de entrada aquí';
    this.gptService.generateText(prompt).then((response) => {
      this.generatedText = response.data.generatedText;
    });
  }
}

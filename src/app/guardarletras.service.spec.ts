import { TestBed } from '@angular/core/testing';

import { GuardarletrasService } from './Service/guardarletras.service';

describe('GuardarletrasService', () => {
  let service: GuardarletrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarletrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

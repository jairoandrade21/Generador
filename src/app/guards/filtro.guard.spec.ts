import { TestBed } from '@angular/core/testing';

import { FiltroGuard } from './filtro.guard';

describe('FiltroGuard', () => {
  let guard: FiltroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FiltroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

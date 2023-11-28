import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuardarletrasPage } from './guardarletras.page';

describe('GuardarletrasPage', () => {
  let component: GuardarletrasPage;
  let fixture: ComponentFixture<GuardarletrasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GuardarletrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

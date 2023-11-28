import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardarletrasPage } from './guardarletras.page';

const routes: Routes = [
  {
    path: '',
    component: GuardarletrasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuardarletrasPageRoutingModule {}

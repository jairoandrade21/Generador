import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardarLetrasPage } from './guardarletras.page';

const routes: Routes = [
  {
    path: '',
    component: GuardarLetrasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuardarletrasPageRoutingModule {}

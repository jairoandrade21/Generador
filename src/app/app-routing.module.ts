import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { E404Page } from './pages/e404/e404.page';
import { AuthGuard } from './guards/filtro.guard';
import { GuardarLetrasPage } from './guardarletras/guardarletras.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'access',
    loadChildren: () => import('./access/access.module').then(m => m.AccessPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule),
    
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  },
  {
    path: 'generador',
    loadChildren: () => import('./generador/generador.module').then( m => m.GeneradorPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'guardarletras',
    loadChildren: () => import('./guardarletras/guardarletras.module').then(m => m.GuardarLetrasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**', 
    component: E404Page
  },
  {
    path: 'guardarletras',
    loadChildren: () => import('./guardarletras/guardarletras.module').then( m => m.GuardarLetrasPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

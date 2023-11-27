import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanActivate guard activated');
    return this.afAuth.authState.pipe(
      take(1),
      tap(user => console.log('Auth state:', user)),
      map(user => {
        if (user) {
          console.log('Usuario autenticado, permitiendo acceso.');
          return true;
        } else {
          console.log('Usuario no autenticado, redirigiendo a /login.');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }

  
  
}

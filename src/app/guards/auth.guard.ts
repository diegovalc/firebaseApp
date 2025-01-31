import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, take, tap } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( 
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
    ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState
    .pipe(take(1))
    .pipe(map(authState => !!authState))
    .pipe(tap(authenticated =>{
      if(!authenticated){
        this.router.navigate(['login']);
      }
    }));
  }
  
}

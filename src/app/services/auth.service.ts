import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private afAuth: AngularFireAuth) { }

  loginGoogle(){
    return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }

  registerUser(email: string, pass: string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    })
  }

  loginEmail(email: string, pass: string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    })
  }

  getAuth(){ //obtenemos datos del usuario en caso de que este logueado
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout(){
    return this.afAuth.auth.signOut();
  }
}

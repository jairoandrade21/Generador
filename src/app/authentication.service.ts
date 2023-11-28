import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public ngFireAuth: AngularFireAuth) {
    this.initializeFirebase();
  }
  
  private initializeFirebase() {
    this.ngFireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  async registerUser(email: string, password: string) {
    try {
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      console.log('Registro exitoso:', userCredential.user);
      return userCredential;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    console.log('Iniciando sesión...');
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      console.log('Inicio de sesión exitoso:', userCredential.user);
      return userCredential;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }


  async resetPassword(email: string) {
    try {
      await this.ngFireAuth.sendPasswordResetEmail(email);
      console.log('Correo de restablecimiento de contraseña enviado.');
    } catch (error) {
      console.error('Error al enviar correo de restablecimiento de contraseña:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await this.ngFireAuth.signOut();
      console.log('Cierre de sesión exitoso.');
      this.clearSessionData(); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
  

  private clearSessionData() {
    localStorage.removeItem('userData');
  }

  async getProfile() {
    try {
      const user = await this.ngFireAuth.currentUser;
      console.log('Información del usuario:', user);
      return user;
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      throw error;
    } 
  }

  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  regForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router,
    public alertService: AlertService
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{6,}$'),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  get errorControl() {
    return this.regForm.controls;
  }

  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    console.log('Formulario válido:', this.regForm.valid);
    console.log('Errores en el formulario:', this.regForm.errors);                                             
    console.log('Errores en el campo email:', this.regForm.get('email').errors);  
    console.log('Errores en el campo password:', this.regForm.get('password').errors); 
    console.log('Errores en el campo confirmPassword:', this.regForm.get('confirmPassword').errors); 
  
    if (this.regForm.valid) {
      const email = this.regForm.value.email;
      const password = this.regForm.value.password;
  
      try {
        await this.authService.registerUser(email, password);
        this.router.navigate(['login']);
      } catch (error) {
        console.log("Registration failed.", error);
        if (error.code === 'auth/email-already-in-use') {
          this.alertService.showError("La dirección de correo electrónico ya está en uso.");
        } else {
          this.alertService.showError("Error de Registro: " + error.message);
        }
      }
    } else {
      // Verifica si el campo confirmPassword tiene errores específicos
      if (this.regForm.hasError('passwordMismatch', ['confirmPassword'])) {
        this.alertService.showError("Las contraseñas no coinciden.");
      } else {
        this.alertService.showError("Por favor, complete todos los campos correctamente.");
      }
    }
  
    await loading.dismiss();
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }
}

import { commonMessages } from 'app/shared/constants/commonMessages';
import { PasswordResetFinishService } from 'app/account/password-reset/finish/password-reset-finish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

declare let alertify: any;

@Component({
  selector: 'jhi-nuevo-correo',
  templateUrl: './nuevo-correo.component.html',
  styleUrls: ['./nuevo-correo.component.scss']
})
export class NuevoCorreoComponent implements OnInit, AfterViewInit {
  nombre = '';
  password = '';
  confirmPassword = '';
  key = '';
  initialized = false;
  doNotMatch = false;
  error = false;
  success = false;
  validacionIncorrecta = true;
  claveNoEnviada = commonMessages.FALTA_CLAVE_REINICIO_LABEL;
  mensajeConfClave: any;
  mensajeClave: any;
  eyePrimero = "../../../content/images/eye.svg";
  eyeSegundo = "../../../content/images/eye.svg";
  inputPrimero = "password";
  inputSegundo = "password";

  Cambiar_Contrasenia = commonMessages.CAMBIAR_CONTRASENIA;
  Cambiar = commonMessages.CAMBIAR;
  

  constructor(private route: ActivatedRoute, private router: Router, private passwordResetFinishService: PasswordResetFinishService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.key = params['key'];
      }
      this.initialized = true;
    });
  }

  ngAfterViewInit(): void {
    if (!this.key) {
      alertify
        .alert()
        .setting({
          label: 'Entendido',
          title: '<b> ERROR </b>',
          movable: false
        })
        .setContent('<p>' + this.claveNoEnviada + '</p>')
        .show();
    }
  }

  confirmarPassword(): void {
    this.doNotMatch = false;
    this.error = false;
    this.validacionIncorrecta = false;
    this.mensajeClave = '';
    this.mensajeConfClave = '';
    if (!this.password) {
      this.mensajeClave = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }
    if (!this.confirmPassword) {
      this.mensajeConfClave = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }
    if (this.validacionIncorrecta === false) {
      if (this.password !== this.confirmPassword) {
        this.mensajeConfClave = commonMessages.CONTRASENA_NO_COINCIDEN;
        this.doNotMatch = true;
      } else {
        if (this.password.length < 4) {
          this.mensajeConfClave = commonMessages.LONGITUD_MINIMA_PASSWORD;
        } else {
          this.passwordResetFinishService.save(this.key, this.confirmPassword).subscribe(
            () => ((this.success = true), this.confirmarRespuesta()),
            () => ((this.error = true), alertify.set('notifier', 'position', 'top-right'), alertify.error('Fallo actualización!'))
          );
        }
      }
    }
  }

  confirmarRespuesta(): void {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('Actualizado correctamente!');
    this.router.navigate(['/inicio-sesion']);
  }

  clicPrimerInput():void{
    if(this.eyePrimero === "../../../content/images/eye.svg"){
      this.eyePrimero = "../../../content/images/eye-slash.svg";
      this.inputPrimero = "text";
    }
    else{
      this.eyePrimero = "../../../content/images/eye.svg";
      this.inputPrimero = "password";
    }
  }

  clicSegundoInput():void{
    if(this.eyeSegundo === "../../../content/images/eye.svg"){
      this.eyeSegundo = "../../../content/images/eye-slash.svg";
      this.inputSegundo = "text";
    }
    else{
      this.eyeSegundo = "../../../content/images/eye.svg";
      this.inputSegundo = "password";
    }
  }
}

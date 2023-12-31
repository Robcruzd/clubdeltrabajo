/* eslint-disable @typescript-eslint/camelcase */
import { commonMessages } from 'app/shared/constants/commonMessages';
import { PasswordResetFinishService } from 'app/account/password-reset/finish/password-reset-finish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

declare let alertify: any;

@Component({
  selector: 'jhi-nuevo-correo',
  templateUrl: './nuevo-correo.component.html',
  styleUrls: ['./nuevo-correo.component.scss']
})
export class NuevoCorreoComponent implements OnInit, AfterViewInit {
  cmNuevoCorreo: any = null;
  nombre = '';
  password = '';
  confirmPassword = '';
  key = '';
  initialized = false;
  doNotMatch = false;
  error = false;
  success = false;
  validacionIncorrecta = true;
  mensajeConfClave: any;
  mensajeClave: any;
  eyePrimero = 'https://d1jbv8ig3bmrxx.cloudfront.net/eye.svg';
  eyeSegundo = 'https://d1jbv8ig3bmrxx.cloudfront.net/eye.svg';
  inputPrimero = 'password';
  inputSegundo = 'password';

  claveNoEnviada = commonMessages.FALTA_CLAVE_REINICIO_LABEL;
  Cambiar_Contrasenia = commonMessages.CAMBIAR_CONTRASENIA;
  Cambiar = commonMessages.CAMBIAR;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passwordResetFinishService: PasswordResetFinishService,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.key = params['key'];
      }
      this.initialized = true;
    });
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmNuevoCorreo'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmNuevoCorreo = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmNuevoCorreo = 0;
        }
      );
  }

  updateVariables(): void {
    this.claveNoEnviada = this.cmNuevoCorreo.FALTA_CLAVE_REINICIO_LABEL;
    this.Cambiar_Contrasenia = this.cmNuevoCorreo.CAMBIAR_CONTRASENIA;
    this.Cambiar = this.cmNuevoCorreo.CAMBIAR;
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

  clicPrimerInput(): void {
    if (this.eyePrimero === 'https://d1jbv8ig3bmrxx.cloudfront.net/eye.svg') {
      this.eyePrimero = 'https://d1jbv8ig3bmrxx.cloudfront.net/eye-slash.svg';
      this.inputPrimero = 'text';
    } else {
      this.eyePrimero = 'https://d1jbv8ig3bmrxx.cloudfront.net/eye.svg';
      this.inputPrimero = 'password';
    }
  }

  clicSegundoInput(): void {
    if (this.eyeSegundo === 'https://d1jbv8ig3bmrxx.cloudfront.net/eye.svg') {
      this.eyeSegundo = 'https://d1jbv8ig3bmrxx.cloudfront.net/eye-slash.svg';
      this.inputSegundo = 'text';
    } else {
      this.eyeSegundo = 'https://d1jbv8ig3bmrxx.cloudfront.net/eye.svg';
      this.inputSegundo = 'password';
    }
  }
}

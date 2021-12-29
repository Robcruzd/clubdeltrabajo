/* eslint-disable @typescript-eslint/camelcase */
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { PasswordResetInitService } from './../../account/password-reset/init/password-reset-init.service';
import { Component, OnInit } from '@angular/core';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

declare let alertify: any;

@Component({
  selector: 'jhi-restaurar-contrasena',
  templateUrl: './restaurar-contrasena.component.html',
  styleUrls: ['./restaurar-contrasena.component.scss']
})
export class RestaurarContrasenaComponent implements OnInit {
  cmRestaurarContra: any = null;
  nombre = '';
  mensajeNombre = '';
  success = false;
  validacionIncorrecta = false;
  respuesta: any;

  Recupera = commonMessages.RECUPERA_CONTRASENIA;
  Email = commonMessages.CORREO_ELECTRONICO_LABEL;
  Recuperar = commonMessages.RECUPERAR;
  Recordar = commonMessages.ME_ACORDE;
  mensajeRecuperacionContrasena = commonMessages.RECUPERACION_PASSWORD_LABEL;
  mensajeCorreoNoExiste = commonMessages.CORREO_NO_EXISTE_LABEL;
  formatoEmailInvalido = commonMessages.FORMATO_EMAIL_INVALIDO;
  campoRequerido = commonMessages.CAMPO_REQUERIDO;

  constructor(
    private passwordResetInitService: PasswordResetInitService,
    private router: Router,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmRestaurarContra'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmRestaurarContra = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmRestaurarContra = 0;
        }
      );
  }

  updateVariables(): void {
    this.Recupera = this.cmRestaurarContra.RECUPERA_CONTRASENIA;
    this.Email = this.cmRestaurarContra.CORREO_ELECTRONICO_LABEL;
    this.Recuperar = this.cmRestaurarContra.RECUPERAR;
    this.Recordar = this.cmRestaurarContra.ME_ACORDE;
    this.mensajeRecuperacionContrasena = this.cmRestaurarContra.RECUPERACION_PASSWORD_LABEL;
    this.mensajeCorreoNoExiste = this.cmRestaurarContra.CORREO_NO_EXISTE_LABEL;
    this.formatoEmailInvalido = this.cmRestaurarContra.FORMATO_EMAIL_INVALIDO;
    this.campoRequerido = this.cmRestaurarContra.CAMPO_REQUERIDO;
  }

  resetPassword(): void {
    this.validacionIncorrecta = false;
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!EMAIL_REGEX.test(String(this.nombre).toLowerCase())) {
      this.mensajeNombre = this.formatoEmailInvalido;
      this.validacionIncorrecta = true;
    }

    if (!this.nombre) {
      this.mensajeNombre = this.campoRequerido;
      this.validacionIncorrecta = true;
    }

    if (!this.validacionIncorrecta) {
      this.passwordResetInitService.save(this.nombre).subscribe(
        response => ((this.respuesta = response), this.validarRespuesta()),
        () => (alertify.set('notifier', 'position', 'top-right'), alertify.error('Error!'))
      );
    }
  }

  ventanaInicioSesionRegistrado(): void {
    this.router.navigate(['/inicio-sesion']);
  }

  validarRespuesta(): void {
    if (this.respuesta) {
      this.success = true;
      alertify
        .alert()
        .setting({
          label: 'Entendido',
          title: '<b> INFORMACIÓN </b>',
          onok: () => {
            this.router.navigate(['/inicio-sesion']);
          }
        })
        .setContent('<p>' + this.mensajeRecuperacionContrasena + '</p>')
        .show();
    } else {
      alertify
        .alert()
        .setting({
          label: 'Entendido',
          title: '<b> ERROR </b>',
          movable: false
        })
        .setContent('<p>' + this.mensajeCorreoNoExiste + '</p>')
        .show();
    }
  }
}

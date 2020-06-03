import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { PasswordResetInitService } from './../../account/password-reset/init/password-reset-init.service';
import { Component, OnInit } from '@angular/core';

declare let alertify: any;

@Component({
  selector: 'jhi-restaurar-contrasena',
  templateUrl: './restaurar-contrasena.component.html',
  styleUrls: ['./restaurar-contrasena.component.scss']
})
export class RestaurarContrasenaComponent implements OnInit {
  nombre = '';
  mensajeNombre = '';
  success = false;
  validacionIncorrecta = false;
  mensajeRecuperacionContrasena = commonMessages.RECUPERACION_PASSWORD_LABEL;
  mensajeCorreoNoExiste = commonMessages.CORREO_NO_EXISTE_LABEL;
  respuesta: any;

  constructor(private passwordResetInitService: PasswordResetInitService, private router: Router) {}

  ngOnInit(): void {}

  resetPassword(): void {
    this.validacionIncorrecta = false;
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!EMAIL_REGEX.test(String(this.nombre).toLowerCase())) {
      this.mensajeNombre = commonMessages.FORMATO_EMAIL_INVALIDO;
      this.validacionIncorrecta = true;
    }

    if (!this.nombre) {
      this.mensajeNombre = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }

    if (!this.validacionIncorrecta) {
      this.passwordResetInitService.save(this.nombre).subscribe(
        response => ((this.respuesta = response), this.validarRespuesta()),
        () => (alertify.set('notifier', 'position', 'top-right'), alertify.error('Error!'))
      );
    }
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

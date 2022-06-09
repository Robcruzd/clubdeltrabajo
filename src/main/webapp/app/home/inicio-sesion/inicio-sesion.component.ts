/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../core/login/login.service';
import { Login } from '../../core/login/login.model';
import { flatMap } from 'rxjs/operators';
import { ActivateService } from 'app/account/activate/activate.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

declare let alertify: any;

@Component({
  selector: 'jhi-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {
  cmInicioSesion: any = null;
  username = '';
  password = '';
  usernameInvalid = false;
  passwordInvalid = false;
  login = new Login(this.username, this.password, false);
  eyePrimero = 'https://d1jbv8ig3bmrxx.cloudfront.net/eye.svg';
  inputPrimero = 'password';

  Mensaje_Bienvenido = commonMessages.MENSAJE_BIENVENIDO;
  Inicio_Registrado = commonMessages.INICIA_REGISTRADO;
  Danger_Campo = commonMessages.DANGER_CAMPO_OBLIGATORIO;
  Inicio_Sesion = commonMessages.INICIO_SESION;
  Olvidaste_Contra = commonMessages.OLVIDASTE_CONTRASENIA;
  No_Registrado = commonMessages.NO_REGISTRADO;
  Hazlo_Aqui = commonMessages.HAZLO_AQUI;

  constructor(
    private route: ActivatedRoute,
    private activateService: ActivateService,
    private router: Router,
    private loginService: LoginService,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(flatMap(params => this.activateService.get(params.key)))
      .subscribe
      // eslint-disable-next-line no-console
      // () => console.log('success'),
      // eslint-disable-next-line no-console
      // () => console.log('error')
      ();
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmInicioSesion'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmInicioSesion = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmInicioSesion = 0;
        }
      );
  }

  updateVariables(): void {
    this.Mensaje_Bienvenido = this.cmInicioSesion.MENSAJE_BIENVENIDO;
    this.Inicio_Registrado = this.cmInicioSesion.INICIA_REGISTRADO;
    this.Danger_Campo = this.cmInicioSesion.DANGER_CAMPO_OBLIGATORIO;
    this.Inicio_Sesion = this.cmInicioSesion.INICIO_SESION;
    this.Olvidaste_Contra = this.cmInicioSesion.OLVIDASTE_CONTRASENIA;
    this.No_Registrado = this.cmInicioSesion.NO_REGISTRADO;
    this.Hazlo_Aqui = this.cmInicioSesion.HAZLO_AQUI;
  }

  deleteSpace(variable: string): void {
    this.login[variable] = this.login[variable].trim();
  }

  ventanaRegistrar(): void {
    this.router.navigate(['/agregar-usuario']);
  }

  ventanaPerfil(): void {
    this.usernameInvalid = false;
    this.passwordInvalid = false;
    if (this.login.username.length === 0) {
      this.usernameInvalid = true;
    }
    if (this.login.password.length === 0) {
      this.passwordInvalid = true;
    }
    if (!this.usernameInvalid && !this.passwordInvalid) {
      this.login.rememberMe = true;
      this.loginService.login(this.login).subscribe(
        res => {
          if (res?.user !== null) {
            this.router.navigate(['/perfil']);
          } else if (res?.userEmpresa !== null) {
            this.router.navigate(['/perfil-empresa']);
          }
        },
        error => this.validarError(error.error)
      );
    }
  }

  ventanaRecuperar(): void {
    this.router.navigate(['/restaurar-contrasena']);
  }

  validarError(error: any): void {
    if (error.detail === 'Credenciales erróneas') {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error('Credenciales erróneas!');
    } else {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error('Fallo en el inicio de sesión!');
    }
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
}

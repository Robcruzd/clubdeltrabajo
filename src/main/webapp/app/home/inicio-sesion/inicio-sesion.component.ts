import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/login/login.service';
import { Login } from '../../core/login/login.model';

declare let alertify: any;

@Component({
  selector: 'jhi-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {
  username = '';
  password = '';
  usernameInvalid = false;
  passwordInvalid = false;
  login = new Login(this.username, this.password, false);

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

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
      this.login.rememberMe = false;
      this.loginService.login(this.login).subscribe(
        () => {
          this.router.navigate(['/perfil']);
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
}

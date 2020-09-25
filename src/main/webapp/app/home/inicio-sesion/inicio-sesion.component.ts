import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../core/login/login.service';
import { Login } from '../../core/login/login.model';
import { flatMap } from 'rxjs/operators';
import { ActivateService } from 'app/account/activate/activate.service';

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
  eyePrimero = '../../../content/images/eye.svg';
  inputPrimero = 'password';

  constructor(
    private route: ActivatedRoute,
    private activateService: ActivateService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(flatMap(params => this.activateService.get(params.key))).subscribe(
      // eslint-disable-next-line no-console
      () => console.log('success'),
      // eslint-disable-next-line no-console
      () => console.log('error')
    );
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

  clicPrimerInput(): void {
    if (this.eyePrimero === '../../../content/images/eye.svg') {
      this.eyePrimero = '../../../content/images/eye-slash.svg';
      this.inputPrimero = 'text';
    } else {
      this.eyePrimero = '../../../content/images/eye.svg';
      this.inputPrimero = 'password';
    }
  }
}

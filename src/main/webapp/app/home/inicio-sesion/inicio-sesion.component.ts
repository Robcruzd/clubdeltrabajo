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
  login = new Login(this.username,this.password,false);

  constructor(private router: Router,private loginService: LoginService) {}

  ngOnInit(): void {
  }

  ventanaRegistrar(): void{
    this.router.navigate(['/agregar-usuario']);
  }

  ventanaPerfil(): void{
    this.login.rememberMe = false;
    this.loginService.login(this.login).subscribe(
        () => {
          this.router.navigate(['/perfil']);
        },
        () => (alertify.set('notifier','position', 'top-right'),
        alertify.error('Fallo ingreso!'))
      );
  }

  ventanaRecuperar(): void{
    this.router.navigate(['/restaurar-contrasena']);
  }

}

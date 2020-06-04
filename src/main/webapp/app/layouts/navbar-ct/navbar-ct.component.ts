import { LoginService } from './../../core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Router, NavigationEnd } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-navbar-ct',
  templateUrl: './navbar-ct.component.html',
  styleUrls: ['./navbar-ct.component.scss']
})
export class NavbarCtComponent implements OnInit {
  lblIngresar = commonMessages.INGRESAR_LABEL;
  lblPerfil = commonMessages.OPCION_PERFIL_LABEL;
  lblSalir = commonMessages.SALIR_LABEL;
  showNavbar = false;
  showElement = false;
  logged = false;
  nombre: any;

  lstOpcionesMenu: any = [
    { id: 1, etiqueta: 'Inicio', ruta: '/' },
    { id: 2, etiqueta: 'Trabajos', ruta: '/' },
    { id: 3, etiqueta: 'Candidatos', ruta: '/' },
    { id: 4, etiqueta: 'Empresas', ruta: '/' },
    { id: 5, etiqueta: 'Registro', ruta: '/' }
  ];

  constructor(private router: Router, private loginService: LoginService, private accountService: AccountService) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.showNavbar = this.accountService.isAuthenticated() ? true : false;
        this.showElement = this.accountService.isAuthenticated() ? true : false;
        this.logged = this.accountService.isAuthenticated() ? true : false;
        this.accountService.getAuthenticationState().subscribe(account => {
          this.nombre = account?.firstName;
        });
      }
    });
  }

  ngOnInit(): void {}

  ventanaInicioSesion(): void {
    this.router.navigate(['/inicio-sesion']);
  }

  cerrarSesion(): void {
    this.logged = false;
    this.showElement = false;
    this.loginService.logout();
    this.router.navigate(['']);
  }

  verPerfil(): void {
    this.router.navigate(['/perfil']);
  }
}

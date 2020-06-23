import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { TipoArchivo } from 'app/shared/vo/tipo-archivo.enum';
import { Account } from '../../core/user/account.model';
import { ArchivoService } from '../../entities/archivo/archivo.service';
import { Archivo } from '../../shared/model/archivo.model';
import { LoginService } from './../../core/login/login.service';

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
  account!: Account | null;
  imagen!: Archivo;
  persona!: number;
  urlImageDefault = '../../../content/images/Image 28.png';

  lstOpcionesMenu: any = [
    { id: 1, etiqueta: 'Inicio', ruta: '/' },
    { id: 3, etiqueta: 'Contáctenos', ruta: '/informacion-empresa' },
    { id: 5, etiqueta: 'Registro', ruta: '/agregar-usuario' }
  ];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService,
    private archivoService: ArchivoService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.showNavbar = this.accountService.isAuthenticated() ? true : false;
        this.showElement = this.accountService.isAuthenticated() ? true : false;
        this.logged = this.accountService.isAuthenticated() ? true : false;
        this.accountService.getAuthenticationState().subscribe(account => {
          this.account = account;
          this.persona = account?.user || 0;
          if (this.showNavbar) {
            this.consultarImagen();
          }
        });
      }
    });
  }

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

  consultarImagen(): void {
    this.archivoService.get(this.persona, TipoArchivo.IMAGEN_PERFIL).subscribe(response => {
      if (response.body !== null) {
        this.imagen = response.body;
      }
    });
  }
}

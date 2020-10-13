import { HojaVidaVo } from './../../shared/vo/hoja-vida-vo';
import { HojaVidaService } from './../../shared/services/hoja-vida.service';
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
  urlImageDefault = '';
  hojaVidaVo!: HojaVidaVo | null;
  hideNavbar = false;

  lstOpcionesMenu: any = [
    { id: 1, etiqueta: 'Inicio', ruta: '/' },
    { id: 3, etiqueta: 'Contáctenos', ruta: '/informacion-empresa' }
    // { id: 5, etiqueta: 'Registro', ruta: '/agregar-usuario' }
  ];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService,
    private archivoService: ArchivoService,
    private hojaVidaService: HojaVidaService
  ) {
    this.subscribeToEvents();
  }

  ngOnInit(): void {
    if (this.router.url === '/' || this.router.url === '/inicio-sesion' || this.router.url === '/agregar-usuario') {
      this.hideNavbar = true;
    } else {
      this.hideNavbar = false;
    }
  }

  subscribeToEvents(): void {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.accountService.getAuthenticationState().subscribe(account => {
          // eslint-disable-next-line no-console
          console.log('account: ', account);
          this.account = account;
          this.persona = account?.user || 0;
          this.showNavbar = this.accountService.isAuthenticated() ? true : false;
          this.showElement = this.accountService.isAuthenticated() ? true : false;
          this.logged = this.accountService.isAuthenticated() ? true : false;
          if (this.router.url === '/' || this.router.url === '/inicio-sesion' || this.router.url === '/agregar-usuario') {
            this.hideNavbar = true;
            if (this.logged) {
              if (this.account?.user) {
                this.router.navigate(['/perfil']);
              } else if (this.account?.userEmpresa) {
                this.router.navigate(['/perfil-empresa']);
              }
            }
          } else {
            this.hideNavbar = false;
          }
          if (this.account?.user) {
            this.hojaVidaService.find(this.persona).subscribe(response => {
              // eslint-disable-next-line no-console
              console.log('ngoninit navbar: ', this.accountService.isAuthenticated());
              this.hojaVidaVo = response.body;
              this.urlImageDefault =
                this.hojaVidaVo?.informacionPersonal && this.hojaVidaVo?.informacionPersonal.genero === 'F'
                  ? '../../../content/images/Image 28_F.png'
                  : '../../../content/images/Image 28_M.png';
            });
          } else if (this.account?.userEmpresa) {
            this.urlImageDefault = '../../../content/images/Image 28_M.png';
          }
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

  cambiarContrasena(): void {
    this.router.navigate(['/restaurar-contrasena']);
  }

  contactenos(): void {
    this.router.navigate(['/informacion-empresa']);
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

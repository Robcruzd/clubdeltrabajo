import { HojaVidaVo } from './../../shared/vo/hoja-vida-vo';
import { HojaVidaService } from './../../shared/services/hoja-vida.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { TipoArchivo } from 'app/shared/vo/tipo-archivo.enum';
import { Account } from '../../core/user/account.model';
import { ArchivoService } from '../../entities/archivo/archivo.service';
import { Archivo } from '../../shared/model/archivo.model';
import { LoginService } from './../../core/login/login.service';
import { NavbarService } from 'app/shared/services/navbar.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  entendido = false;
  account!: Account | null;
  imagen!: Archivo;
  persona!: number;
  urlImageDefault = 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28_M.png';
  hojaVidaVo!: HojaVidaVo | null;
  hideNavbar = false;
  public navbarState = true;
  perfil = '/perfil';
  tipoArchivo = TipoArchivo;
  Politicas_cookies = commonMessages.POLITICAS_COOKIES;
  TCP = commonMessages.TERMINOS_CONDICIONES_POLITICAS;
  isOpen = false;
  Aceptar = commonMessages.ACEPTAR;

  lstOpcionesMenu: any = [
    { id: 1, etiqueta: 'Inicio', ruta: '/' },
    { id: 2, etiqueta: 'Personas', ruta: '/previo-registrar' },
    { id: 3, etiqueta: 'Empresas', ruta: '/previo-registrar-emp' },
    { id: 4, etiqueta: 'Publicaciones', ruta: '/resultados-busqueda' },
    // { id: 5, etiqueta: 'Nosotros', ruta: '/nosotros' },
    { id: 6, etiqueta: 'Contacto', ruta: '/informacion-empresa' }
  ];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService,
    private archivoService: ArchivoService,
    private hojaVidaService: HojaVidaService,
    private navbarService: NavbarService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) {
    this.navbarService.cast.subscribe(status => {
      if (status !== null) {
        this.navbarState = status;
        this.cd.detectChanges();
      }
    });
    this.subscribeToEvents();
  }

  ngOnInit(): void {
    if (this.router.url === '/inicio-sesion') {
      this.hideNavbar = true;
    } else {
      this.hideNavbar = false;
    }
    if (sessionStorage.getItem('entendidoCookie') === 'true') {
      this.entendido = true;
    }
    this.getAuthentication();
    // this.cd.detectChanges();
  }

  openScrollableContent(longContent: any): void {
    const modalRef: NgbModalRef = this.modalService.open(longContent, { scrollable: true });
    modalRef.result.finally(() => (this.isOpen = false));
  }

  subscribeToEvents(): void {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.getAuthentication();
      }
    });
  }

  getAuthentication(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      // eslint-disable-next-line no-console
      // console.log('acount---------------', this.account);
      this.persona = account?.user || 0;
      this.showNavbar = this.accountService.isAuthenticated() ? true : false;
      this.showElement = this.accountService.isAuthenticated() ? true : false;
      this.logged = this.accountService.isAuthenticated() ? true : false;
      if (this.router.url === '/inicio-sesion') {
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
          this.hojaVidaVo = response.body;
          this.urlImageDefault =
            this.hojaVidaVo?.informacionPersonal && this.hojaVidaVo?.informacionPersonal.genero === 'F'
              ? 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28_F.png'
              : 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28_M.png';
        });
        this.perfil = '/perfil';
      } else if (this.account?.userEmpresa) {
        this.perfil = '/perfil-empresa';
        this.urlImageDefault = 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28_M.png';
      }
      if (this.showNavbar) {
        if (this.account?.user) {
          this.lstOpcionesMenu = [
            { id: 1, etiqueta: 'Inicio', ruta: '/' },
            { id: 2, etiqueta: 'Perfil', ruta: '/perfil' },
            { id: 4, etiqueta: 'Publicaciones', ruta: '/resultados-busqueda' },
            // { id: 5, etiqueta: 'Nosotros', ruta: '/nosotros' },
            { id: 6, etiqueta: 'Contacto', ruta: '/informacion-empresa' }
          ];
          this.consultarImagen();
        } else if (this.account?.userEmpresa) {
          this.lstOpcionesMenu = [
            { id: 1, etiqueta: 'Inicio', ruta: '/' },
            { id: 3, etiqueta: 'Perfil', ruta: '/perfil-empresa' },
            { id: 4, etiqueta: 'Publicaciones', ruta: '/resultados-busqueda' },
            // { id: 5, etiqueta: 'Nosotros', ruta: '/nosotros' },
            { id: 6, etiqueta: 'Contacto', ruta: '/informacion-empresa' }
          ];
          this.consultarImagenEmp();
        }
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

  // nosotros(): void {
  //   this.router.navigate(['/nosotros']);
  // }

  cerrarSesion(): void {
    this.lstOpcionesMenu = [
      { id: 1, etiqueta: 'Inicio', ruta: '/' },
      { id: 2, etiqueta: 'Personas', ruta: '/previo-registrar' },
      { id: 3, etiqueta: 'Empresas', ruta: '/previo-registrar-emp' },
      { id: 4, etiqueta: 'Publicaciones', ruta: '/resultados-busqueda' },
      // { id: 5, etiqueta: 'Nosotros', ruta: '/nosotros' },
      { id: 6, etiqueta: 'Contacto', ruta: '/informacion-empresa' }
    ];
    this.logged = false;
    this.showElement = false;
    this.loginService.logout();
    this.router.navigate(['']);
  }

  verPerfil(): void {
    this.router.navigate([this.perfil]);
  }

  consultarImagen(): void {
    this.archivoService.get(this.persona, TipoArchivo.IMAGEN_PERFIL).subscribe(response => {
      if (response.body !== null) {
        this.imagen = response.body;
      }
    });
  }

  consultarImagenEmp(): void {
    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, this.account?.userEmpresa!).subscribe(response => {
      if (response.body !== null) {
        this.imagen = response.body;
      }
    });
  }

  entendidoCookie(): void {
    sessionStorage.setItem('entendidoCookie', 'true');
    this.entendido = true;
  }

  accederRuta(elemento: any): void {
    if (elemento === 'persona') {
      this.router.navigate(['/previo-registrar']);
    } else if (elemento === 'empresa') {
      this.router.navigate(['/previo-registrar-emp']);
    } else if (elemento === 'publicacion') {
      this.router.navigate(['/resultados-busqueda']);
      // } else if (elemento === 'nosotros') {
      //   this.router.navigate(['/nosotros']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

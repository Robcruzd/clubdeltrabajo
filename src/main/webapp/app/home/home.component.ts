/* eslint-disable @typescript-eslint/camelcase */

import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Router } from '@angular/router';
import { IRegiones } from 'app/shared/model/regiones.model';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { HttpResponse } from '@angular/common/http';
import { IProfesion } from 'app/shared/model/profesion.model';
import { FormControl } from '@angular/forms';
import { ProfesionService } from 'app/entities/profesion/profesion.service';
import { map, startWith } from 'rxjs/operators';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { DataService } from 'app/shared/services/data.service';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { IOferta, Oferta } from 'app/shared/model/oferta.model';
import { IOpcionVo } from 'app/shared/vo/opcion-vo';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { TipoArchivo } from 'app/shared/vo/tipo-archivo.enum';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';
import { UserService } from 'app/core/user/user.service';

declare const MercadoPago: any;

declare let gtag: Function;
declare const gapi: any;

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cmHome: any = null;
  faArrowRight = faArrowRight;
  account: Account | null = null;
  authSubscription?: Subscription;
  region: Array<IRegiones> = [];
  ofertas: Array<Oferta> = [];
  data: any = [];
  filteredOptionsCiudades = new Observable<string[]>();
  filteredOptionsProfesiones = new Observable<string[]>();
  myControlCiudades = new FormControl();
  myControlProfesiones = new FormControl();
  ciudades: string[] = [];
  profesiones: string[] = [];
  dataProf: Array<IProfesion> = [];
  geografia: Array<GeografiaVo> = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  listaOfertas: any = [];
  imagen: any;
  urlImgDefault = '../../../content/images/Image 28.png';
  showButtons = null;
  checkout: any;
  preferenceId = '';
  countPersonas = 0;
  countEmpresas = 0;
  analytics: any;
  // Replace with your view ID.
  VIEW_ID = '232161926';

  Haz_Parte = commonMessages.HAZ_PARTE;
  D_VIDEO = commonMessages.DANGER_VIDEO;
  Registra_HV = commonMessages.REGISTRA_YA_HV;
  ES_GRATIS = commonMessages.ES_GRATIS;
  Ya_Registrado = commonMessages.YA_ESTAS_REGISTRADO;
  Entra = commonMessages.ENTRA;
  Ofertas_Destacadas = commonMessages.OFERTAS_DESTACADAS;
  Ver = commonMessages.VER;
  Explora_ofertas = commonMessages.EXPLORA_CIENTOS_OFERTAS;
  Registra_Hoja = commonMessages.REGISTRA_HOJA_VIDA;
  Buscar = commonMessages.BUSCAR;
  Clic_Aca = commonMessages.CLIC_ACA;
  Es_Gratis_M = commonMessages.ES_GRATIS_M;
  Nuevas_Ofertas = commonMessages.NUEVAS_OFERTAS;
  Ofertas_Email = commonMessages.OFERTAS_EMAIL;
  Emp_B_Candidatos = commonMessages.EMPRESA_BUSCA_CANDIDATOS;
  lblSeleccioneProfesion = commonMessages.SELECCIONE_PROFESION_LABEL;
  lblSeleccioneCiudad = commonMessages.SELECCIONE_CIUDAD_LABEL;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  Visitas = commonMessages.VISITAS;
  Personas = commonMessages.PERSONAS;
  Empresas = commonMessages.EMPRESAS;

  @ViewChild('panel', { read: ElementRef }) public panel!: ElementRef<any>;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private router: Router,
    private profesionService: ProfesionService,
    private regionService: RegionesService,
    private dataService: DataService,
    private ofertaService: OfertaService,
    private archivoService: ArchivoService,
    private commonMessagesService: CommonMessagesService,
    private userService: UserService
  ) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     gtag('config', 'UA-181764554-1', {
    //       // eslint-disable-next-line @typescript-eslint/camelcase
    //       page_path: event.urlAfterRedirects
    //     });
    //   }
    // });
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmHome'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmHome = mensajes;
          this.updateVariables();
          this.traerProfesiones();
          this.traerCiudad();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmHome = 0;
          this.traerProfesiones();
          this.traerCiudad();
        }
      );
  }

  updateVariables(): void {
    const commonData: any = JSON.parse(sessionStorage.getItem('commonData')!);
    this.Haz_Parte = this.cmHome.HAZ_PARTE;
    this.D_VIDEO = this.cmHome.DANGER_VIDEO;
    this.Registra_HV = this.cmHome.REGISTRA_YA_HV;
    this.ES_GRATIS = this.cmHome.ES_GRATIS;
    this.Ya_Registrado = this.cmHome.YA_ESTAS_REGISTRADO;
    this.Entra = this.cmHome.ENTRA;
    this.Ofertas_Destacadas = this.cmHome.OFERTAS_DESTACADAS;
    this.Ver = this.cmHome.VER;
    this.Explora_ofertas = this.cmHome.EXPLORA_CIENTOS_OFERTAS;
    this.Registra_Hoja = this.cmHome.REGISTRA_HOJA_VIDA;
    this.Buscar = this.cmHome.BUSCAR;
    this.Clic_Aca = this.cmHome.CLIC_ACA;
    this.Es_Gratis_M = this.cmHome.ES_GRATIS_M;
    this.Nuevas_Ofertas = this.cmHome.NUEVAS_OFERTAS;
    this.Ofertas_Email = this.cmHome.OFERTAS_EMAIL;
    this.Emp_B_Candidatos = this.cmHome.EMPRESA_BUSCA_CANDIDATOS;
    this.lblSeleccioneProfesion = this.cmHome.SELECCIONE_PROFESION_LABEL;
    this.lblSeleccioneCiudad = this.cmHome.SELECCIONE_CIUDAD_LABEL;
    this.aspiracionesSalariales = commonData.ARRAY_ASPIRACION_SALARIAL;
    this.Visitas = this.cmHome.VISITAS;
    this.Personas = this.cmHome.PERSONAS;
    this.Empresas = this.cmHome.EMPRESAS;
  }

  video(): void {
    /* eslint-disable no-console */
    console.log(this.account);
    this.userService.contarEmpresas().subscribe(count => {
      this.countEmpresas = count;
    });
    this.userService.analytics().subscribe((count: any) => {
      this.analytics = count;
    });
    this.userService.contarPersonas().subscribe(count => {
      this.countPersonas = count;
    });
    const vid = document.getElementById('vid') as HTMLVideoElement;
    vid.muted = true;
    vid.loop = true;
    vid?.play();
    this.traerProfesiones();
    this.traerCiudad();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  public scrollRight(): void {
    this.panel?.nativeElement.scrollTo({ left: this.panel?.nativeElement.scrollLeft + 150, behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.panel?.nativeElement.scrollTo({ left: this.panel?.nativeElement.scrollLeft - 150, behavior: 'smooth' });
  }

  private _filterCiudades(value: string): string[] {
    this.ciudades = [];
    const filterValue = this.removeAccents(value.toLowerCase());
    for (const valor of this.data) {
      this.ciudades.push(valor.municipio);
    }
    return this.ciudades.filter(option => this.removeAccents(option.toLowerCase()).includes(filterValue)).sort();
  }

  private _filterProfesiones(value: string): string[] {
    this.profesiones = [];
    const filterValue = this.removeAccents(value.toLowerCase());
    // return this.profesiones.filter(option => option.profesion?.toLowerCase().includes(filterValue));
    for (const valor of this.dataProf) {
      this.profesiones.push(valor.profesion!);
    }
    return this.profesiones.filter(option => this.removeAccents(option.toLowerCase()).includes(filterValue)).sort();
  }

  private removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  traerCiudad(): void {
    this.regionService
      .query({
        page: 0,
        size: 1150
      })
      .subscribe((res: HttpResponse<IRegiones[]>) => {
        // this.region = res.body || [];
        this.data = res.body;
        this.filteredOptionsCiudades = this.myControlCiudades.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCiudades(value))
        );
        this.geografia = res.body!.map(
          item =>
            new GeografiaVo(
              item.codigoDaneDelDepartamento?.toString()!,
              item.departamento!,
              item.codigoDaneDelMunicipio?.toString()!,
              item.municipio!
            )
        );
        this.cargarMunicipiosPersonal();
        this.video();
      });
  }

  cargarMunicipiosPersonal(): void {
    this.municipiosPersonal = [];
    this.municipiosPersonal = this.geografia
      .map(item => {
        return {
          codigo: item.codigoMpio,
          nombre: item.nombreMpio
        };
      })
      .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
    this.cargarInformacionCuenta();
  }

  traerProfesiones(): void {
    this.profesionService
      .query({
        page: 0,
        size: 550
      })
      .subscribe((res: HttpResponse<IProfesion[]>) => {
        this.dataProf = res.body!;
        this.filteredOptionsProfesiones = this.myControlProfesiones.valueChanges.pipe(
          startWith(''),
          map(value => this._filterProfesiones(value))
        );
      });
  }

  cargarInformacionCuenta(): void {
    this.ofertaService
      .query({
        page: 0,
        size: 5,
        sort: ['fechaPublicacion,desc'],
        'estado.equals': 'A'
      })
      .subscribe((res: HttpResponse<IOferta[]>) => {
        // eslint-disable-next-line no-console
        console.log('response:     ', res);
        this.ofertas = res.body!;
        // eslint-disable-next-line no-console
        console.log('lista ofertas: ', this.ofertas);
        this.ofertas.forEach(element => {
          const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
          const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
          const profBD = this.dataProf.find(profesion => profesion.id === element.profesion);
          this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
            response => {
              // eslint-disable-next-line no-console
              console.log('response:     ', element);
              // if (response.body !== null) {
              //   this.imagen = response.body;
              // }

              this.listaOfertas.push({
                id: element.id?.toString(),
                profesion: profBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                activado: element?.activado,
                empresa: element?.usuario?.razonSocial,
                fecha: element.fechaPublicacion?.format('DD/MM/YYYY'),
                imagen: response.body?.archivo,
                mostrarSalario: element?.mostrarSalario
              });
            },
            error => {
              // eslint-disable-next-line no-console
              console.log(error);
              this.listaOfertas.push({
                id: element.id?.toString(),
                profesion: profBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                activado: element?.activado,
                empresa: element?.usuario?.razonSocial,
                fecha: element.fechaPublicacion?.format('DD/MM/YYYY'),
                imagen: this.urlImgDefault,
                mostrarSalario: element?.mostrarSalario
              });
            }
          );
        });
        // eslint-disable-next-line no-console
        console.log('lista ofertas: ', this.listaOfertas);
      });
  }

  // consultarImagen(): void {
  //   // eslint-disable-next-line no-console
  //   console.log('consultar imagennnnnnn ', this.empresa);
  //   this.archivoService.getEmp(this.empresa.id, TipoArchivo.IMAGEN_PERFIL).subscribe(response => {
  //     // eslint-disable-next-line no-console
  //     console.log('response:     ', response);
  //     if (response.body !== null) {
  //       this.imagen = response.body;
  //     }
  //   });
  // }

  buscar(): void {
    const busqueda = {
      profesion: this.myControlProfesiones.value,
      ubicacion: this.myControlCiudades.value
    };
    this.dataService.data = busqueda;
    this.router.navigate(['/resultados-busqueda', { general: true }]);
  }

  abrirAgregarUsuario(): void {
    this.router.navigate(['/previo-registrar']);
  }

  registrarHojaVidaEmpresa(): void {
    this.router.navigate(['/previo-registrar-emp']);
  }

  ventanaInicioSesion(): void {
    this.router.navigate(['/inicio-sesion']);
  }

  verOferta(oferta: any): void {
    this.router.navigate(['/oferta-publica'], { queryParams: { oferta: oferta.id, general: 'true' } });
  }
}

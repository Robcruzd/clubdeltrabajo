import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Router, NavigationEnd } from '@angular/router';
import { IRegiones } from 'app/shared/model/regiones.model';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { HttpResponse } from '@angular/common/http';
import { IProfesion, Profesion } from 'app/shared/model/profesion.model';
import { FormControl } from '@angular/forms';
import { ProfesionService } from 'app/entities/profesion/profesion.service';
import { map, startWith } from 'rxjs/operators';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { DataService } from 'app/shared/services/data.service';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { IOferta, Oferta } from 'app/shared/model/oferta.model';
import { IlistarOfertas, IOpcionVo } from 'app/shared/vo/opcion-vo';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { TipoArchivo } from 'app/shared/vo/tipo-archivo.enum';

declare let gtag: Function;

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
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
  lblSeleccioneProfesion = commonMessages.SELECCIONE_PROFESION_LABEL;
  lblSeleccioneCiudad = commonMessages.SELECCIONE_CIUDAD_LABEL;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  geografia: Array<GeografiaVo> = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  listaOfertas: any = [];
  imagen: any;
  ulrImgDefault = '../../../content/images/Image 28.png';

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private router: Router,
    private profesionService: ProfesionService,
    private regionService: RegionesService,
    private dataService: DataService,
    private ofertaService: OfertaService,
    private archivoService: ArchivoService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-181764554-1', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    const vid = document.getElementById('vid') as HTMLVideoElement;
    vid.muted = true;
    vid.loop = true;
    vid?.play();
    this.traerProfesiones();
    this.traerCiudad();
    // this.cargarProfesiones();
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

  private _filterCiudades(value: string): string[] {
    this.ciudades = [];
    const filterValue = value.toLowerCase();
    for (const valor of this.data) {
      this.ciudades.push(valor.municipio + ' (' + valor.departamento + ')');
    }
    return this.ciudades.filter(option => option.toLowerCase().includes(filterValue)).sort();
  }

  private _filterProfesiones(value: string): string[] {
    this.profesiones = [];
    const filterValue = value.toLowerCase();
    // return this.profesiones.filter(option => option.profesion?.toLowerCase().includes(filterValue));
    for (const valor of this.dataProf) {
      this.profesiones.push(valor.profesion!);
    }
    return this.profesiones.filter(option => option.toLowerCase().includes(filterValue)).sort();
  }

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
        size: 5
      })
      .subscribe((res: HttpResponse<IOferta[]>) => {
        this.ofertas = res.body!;
        // eslint-disable-next-line no-console
        console.log('lista ofertas: ', this.ofertas);
        this.ofertas.forEach(element => {
          const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
          const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
          const profBD = this.dataProf.find(profesion => profesion.id === element.profesion);
          this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(response => {
            // eslint-disable-next-line no-console
            console.log('response:     ', response);
            if (response.body !== null) {
              this.imagen = response.body;
            }

            this.listaOfertas.push({
              id: element.id?.toString(),
              profesion: profBD?.profesion,
              salario: salarioBD?.nombre,
              ciudad: ciudadBD?.nombre,
              activado: element?.activado,
              empresa: element?.usuario?.razonSocial,
              fecha:
                element.fechaPublicacion?.daysInMonth()! +
                '/' +
                element.fechaPublicacion?.month()! +
                '/' +
                element.fechaPublicacion?.year()!,
              imagen: response.body?.archivo
            });
          });
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
    this.router.navigate(['/resultados-busqueda']);
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
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Router, NavigationEnd } from '@angular/router';
import { IRegiones } from 'app/shared/model/regiones.model';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { HttpResponse } from '@angular/common/http';
import { IProfesion } from 'app/shared/model/profesion.model';
import { FormControl } from '@angular/forms';
import { ProfesionService } from 'app/entities/profesion/profesion.service';
import { map, startWith } from 'rxjs/operators';
import { commonMessages } from 'app/shared/constants/commonMessages';

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
  ofertas = [];
  data: any = [];
  filteredOptionsCiudades = new Observable<string[]>();
  filteredOptionsProfesiones = new Observable<IProfesion[]>();
  myControlCiudades = new FormControl();
  myControlProfesiones = new FormControl();
  ciudades: string[] = [];
  profesiones: Array<IProfesion> = [];
  lblSeleccioneProfesion = commonMessages.SELECCIONE_PROFESION_LABEL;
  lblSeleccioneCiudad = commonMessages.SELECCIONE_CIUDAD_LABEL;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private router: Router,
    private profesionService: ProfesionService,
    private regionService: RegionesService
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
    this.traerCiudad();
    this.cargarProfesiones();
    this.traerProfesiones();
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
    return this.ciudades.filter(option => option.toLowerCase().startsWith(filterValue)).sort();
  }

  private _filterProfesiones(value: string): IProfesion[] {
    this.profesiones = [];
    const filterValue = value.toLowerCase();
    return this.profesiones.filter(option => option.profesion?.toLowerCase().includes(filterValue));
    // for (const valor of this.dataProf) {
    //   this.profesiones.push(valor.profesion);
    // }
    // return this.profesiones.filter(option => option.toLowerCase().startsWith(filterValue)).sort();
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
      });
  }

  traerProfesiones(): void {
    this.filteredOptionsProfesiones = this.myControlProfesiones.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProfesiones(value))
    );
  }

  cargarProfesiones(): void {
    this.profesionService
      .query({
        page: 0,
        size: 550
      })
      .subscribe((res: HttpResponse<IProfesion[]>) => (this.profesiones = res.body || []));
    // .subscribe((res: HttpResponse<IProfesion[]>) => {
    //   this.dataProf = res.body;
    //   this.filteredOptionsProfesiones = this.myControlProfesiones.valueChanges.pipe(
    //     startWith(''),
    //     map(value => this._filterProfesiones(value))
    //   );
    // });
  }

  abrirAgregarUsuario(): void {
    this.router.navigate(['/agregar-usuario', { userType: 'natural' }]);
  }

  registrarHojaVidaEmpresa(): void {
    this.router.navigate(['/agregar-usuario', { userType: 'juridico' }]);
  }

  ventanaInicioSesion(): void {
    this.router.navigate(['/inicio-sesion']);
  }
}

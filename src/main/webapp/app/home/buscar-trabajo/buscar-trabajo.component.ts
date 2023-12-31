/* eslint-disable @typescript-eslint/camelcase */
import { DataService } from './../../shared/services/data.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'app/shared/services/api.service';
import { Router } from '@angular/router';
import { IProfesion } from 'app/shared/model/profesion.model';
import { ProfesionService } from '../../entities/profesion/profesion.service';
import { HttpResponse } from '@angular/common/http';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { IRegiones } from 'app/shared/model/regiones.model';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

@Component({
  selector: 'jhi-buscar-trabajo',
  templateUrl: './buscar-trabajo.component.html',
  styleUrls: ['./buscar-trabajo.component.scss'],
  providers: [ApiService]
})
export class BuscarTrabajoComponent implements OnInit {
  myControlCiudades = new FormControl();
  myControlProfesiones = new FormControl();
  // profesiones: string[] = ['Diseño grafico', 'Ingenieria de sistemas', 'Ingenieria electronica', 'Nutricion'];
  profesiones2: string[] = ['Diseño grafico', 'Ingenieria de sistemas', 'Ingenieria electronica', 'Nutricion'];
  public keyword = 'municipio';
  data: any = [];
  ciudades: string[] = [];
  profesiones: Array<IProfesion> = [];
  dataProf: any = [];
  cmBuscarTrabajo: any = null;
  // profesiones: string[] = [];

  filteredOptionsCiudades = new Observable<string[]>();
  filteredOptionsProfesiones = new Observable<IProfesion[]>();
  // IProfesion[]

  Busca_Trabajo = commonMessages.BUSCA_TRABAJO;
  Buscar = commonMessages.BUSCAR;
  Registra_Hoja_Vida = commonMessages.REGISTRA_HOJA_VIDA;
  Soluciones_Empresa = commonMessages.SOLUCIONES_EMPRESA;
  lblSeleccioneProfesion = commonMessages.SELECCIONE_PROFESION_LABEL;
  lblSeleccioneCiudad = commonMessages.SELECCIONE_CIUDAD_LABEL;

  constructor(
    private ciudadServices: ApiService,
    private dataService: DataService,
    private router: Router,
    private profesionService: ProfesionService,
    private regionService: RegionesService,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    this.commonMessagesService.find(1).subscribe(res => {
      /* eslint-disable no-console */
      // console.log(JSON.parse(res.body?.mensajes!));
      this.cmBuscarTrabajo = JSON.parse(res.body?.mensajes!);
      // this.sessionStorage.store('commonMessages', JSON.parse(res.body?.mensajes!));
      this.updateVariables();
      this.traerCiudad();
      this.cargarProfesiones();
      this.traerProfesiones();
    });
    // this.traerProfesiones();
    // this.cargarProfesiones();
  }

  updateVariables(): void {
    this.Busca_Trabajo = this.cmBuscarTrabajo.BUSCA_TRABAJO;
    this.Buscar = this.cmBuscarTrabajo.BUSCAR;
    this.Registra_Hoja_Vida = this.cmBuscarTrabajo.REGISTRA_HOJA_VIDA;
    this.Soluciones_Empresa = this.cmBuscarTrabajo.SOLUCIONES_EMPRESA;
    this.lblSeleccioneProfesion = this.cmBuscarTrabajo.SELECCIONE_PROFESION_LABEL;
    this.lblSeleccioneCiudad = this.cmBuscarTrabajo.SELECCIONE_CIUDAD_LABEL;
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

  buscar(): void {
    const busqueda = {
      profesion: this.myControlProfesiones.value,
      ubicacion: this.myControlCiudades.value
    };
    this.dataService.data = busqueda;
    this.router.navigate(['/resultados-busqueda']);
  }

  registrarHojaVida(): void {
    this.router.navigate(['/agregar-usuario'], { queryParams: { userType: 'natural' } });
  }

  registrarHojaVidaEmpresa(): void {
    this.router.navigate(['/agregar-usuario'], { queryParams: { userType: 'juridico' } });
  }
}

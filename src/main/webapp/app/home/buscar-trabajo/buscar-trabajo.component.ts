import { DataService } from './../../shared/services/data.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'app/shared/services/api.service';
import { Router } from '@angular/router';
import { ProfesionService } from '../../entities/profesion/profesion.service';
import { HttpResponse } from '@angular/common/http';
import { IProfesion } from 'app/shared/model/profesion.model';

@Component({
  selector: 'jhi-buscar-trabajo',
  templateUrl: './buscar-trabajo.component.html',
  styleUrls: ['./buscar-trabajo.component.scss'],
  providers: [ApiService]
})
export class BuscarTrabajoComponent implements OnInit {
  myControlCiudades = new FormControl();
  myControlProfesiones = new FormControl();
  lblSeleccioneProfesion = commonMessages.SELECCIONE_PROFESION_LABEL;
  lblSeleccioneCiudad = commonMessages.SELECCIONE_CIUDAD_LABEL;
  profesiones2: string[] = ['Diseño grafico', 'Ingenieria de sistemas', 'Ingenieria electronica', 'Nutricion'];
  public keyword = 'municipio';
  data: any = [];
  ciudades: string[] = [];
  dataProf: any = [];
  profesiones: string[] = [];

  filteredOptionsCiudades = new Observable<string[]>();
  filteredOptionsProfesiones = new Observable<string[]>();

  constructor(
    private ciudadServices: ApiService,
    private dataService: DataService,
    private router: Router,
    private profesionService: ProfesionService
  ) {}

  ngOnInit(): void {
    this.traerCiudad();
    // this.traerProfesiones();
    this.cargarProfesiones();
  }

  private _filterCiudades(value: string): string[] {
    this.ciudades = [];
    const filterValue = value.toLowerCase();
    for (const valor of this.data) {
      this.ciudades.push(valor.municipio + ' (' + valor.departamento + ')');
    }
    return this.ciudades.filter(option => option.toLowerCase().startsWith(filterValue)).sort();
  }

  private _filterProfesiones(value: string): string[] {
    this.profesiones = [];
    const filterValue = value.toLowerCase();
    for (const valor of this.dataProf) {
      this.profesiones.push(valor.profesion);
    }
    return this.profesiones.filter(option => option.toLowerCase().startsWith(filterValue)).sort();
  }

  traerCiudad(): void {
    this.ciudadServices.getCiudades().subscribe(response => {
      this.data = response;
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
      .subscribe((res: HttpResponse<IProfesion[]>) => {
        this.dataProf = res.body;
        this.filteredOptionsProfesiones = this.myControlProfesiones.valueChanges.pipe(
          startWith(''),
          map(value => this._filterProfesiones(value))
        );
      });
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
    this.router.navigate(['/agregar-usuario', { userType: 'natural' }]);
  }

  registrarHojaVidaEmpresa(): void {
    this.router.navigate(['/agregar-usuario', { userType: 'juridico' }]);
  }
}

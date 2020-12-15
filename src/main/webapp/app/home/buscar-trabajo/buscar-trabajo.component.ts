import { DataService } from './../../shared/services/data.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'app/shared/services/api.service';
import { Router } from '@angular/router';
import { IProfesion } from 'app/shared/model/profesion.model';
import { ProfesionService } from 'app/entities/profesion/profesion.service';
import { HttpResponse } from '@angular/common/http';

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
  // profesiones: string[] = ['Diseño grafico', 'Ingenieria de sistemas', 'Ingenieria electronica', 'Nutricion'];
  public keyword = 'municipio';
  data: any = [];
  ciudades: string[] = [];
  profesiones: Array<IProfesion> = [];

  filteredOptionsCiudades = new Observable<string[]>();
  filteredOptionsProfesiones = new Observable<IProfesion[]>();

  constructor(private ciudadServices: ApiService, private dataService: DataService, private router: Router,
    private profesionService: ProfesionService) {}

  ngOnInit(): void {
    this.traerCiudad();
    this.cargarProfesiones();
    this.traerProfesiones();
  }

  private _filterCiudades(value: string): string[] {
    this.ciudades = [];
    const filterValue = value.toLowerCase();
    for (const valor of this.data) {
      this.ciudades.push(valor.municipio + ' (' + valor.departamento + ')');
    }
    // eslint-disable-next-line no-console
    console.log(this.ciudades);
    return this.ciudades.filter(option => option.toLowerCase().startsWith(filterValue)).sort();
  }

  private _filterProfesiones(value: string): IProfesion[] {
    const filterValue = value.toLowerCase();
    return this.profesiones.filter(option => option.profesion?.toLowerCase().includes(filterValue));
  }

  traerCiudad(): void {
    this.ciudadServices.getCiudades().subscribe(response => {
      this.data = response;
      // eslint-disable-next-line no-console
      console.log('response: ', response);
      // eslint-disable-next-line @typescript-eslint/camelcase
      const bogota = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        c_digo_dane_del_departamento: '5',
        // eslint-disable-next-line @typescript-eslint/camelcase
        c_digo_dane_del_municipio: '5001',
        departamento: 'Bogotá D.C.',
        region: 'Región Centro Oriente',
        municipio: 'Bogotá D.C.'
      };
      this.data.push(bogota);
      this.filteredOptionsCiudades = this.myControlCiudades.valueChanges.pipe(map(value => this._filterCiudades(value)));
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

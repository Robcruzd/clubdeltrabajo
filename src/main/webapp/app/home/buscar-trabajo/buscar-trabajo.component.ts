import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-buscar-trabajo',
  templateUrl: './buscar-trabajo.component.html',
  styleUrls: ['./buscar-trabajo.component.scss'],
  providers: [ApiService]
})
export class BuscarTrabajoComponent implements OnInit {
  myControlCiudades = new FormControl();
  myControlProfesiones = new FormControl();
  profesiones: string[] = ['Diseño grafico', 'Ingenieria de sistemas', 'Ingenieria electronica', 'Nutricion'];
  public keyword = 'municipio';
  data: any = [];
  ciudades: string[] = [];

  filteredOptionsCiudades = new Observable<string[]>();
  filteredOptionsProfesiones = new Observable<string[]>();

  constructor(private ciudadServices: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.traerCiudad();
    this.traerProfesiones();
  }

  private _filterCiudades(value: string): string[] {
    this.ciudades = [];
    const filterValue = value.toLowerCase();
    for (const valor of this.data) {
      this.ciudades.push(valor.municipio);
    }
    return this.ciudades.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterProfesiones(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.profesiones.filter(option => option.toLowerCase().includes(filterValue));
  }

  traerCiudad(): void {
    this.ciudadServices.getInformacionGeografica().subscribe(response => {
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

  registrarHojaVida(): void {
    this.router.navigate(['/agregar-usuario']);
  }
}

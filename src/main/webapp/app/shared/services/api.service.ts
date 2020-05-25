import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { commonMessages } from '../constants/commonMessages';
import { URL_UBICACIONES, URL_PAISES } from '../constants/constantes.constants';
import { GeografiaVo } from '../vo/geografia-vo';
import { IOpcionVo } from '../vo/option-vo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getInformacionGeografica(): Observable<GeografiaVo[]> {
    return this.http
      .get<any[]>(URL_UBICACIONES)
      .pipe(
        map(element =>
          element.map(
            item => new GeografiaVo(item.c_digo_dane_del_departamento, item.departamento, item.c_digo_dane_del_municipio, item.municipio)
          )
        )
      );
  }

  getPaises(): Observable<IOpcionVo[]> {
    return this.http.get<any[]>(URL_PAISES).pipe(
      map(element =>
        element.map(item => {
          return {
            codigo: item.alpha2Code,
            nombre: item.name
          };
        })
      )
    );
  }

  getDiscapacidades(): IOpcionVo[] {
    return commonMessages.ARRAY_DISCAPACIDADES;
  }

  getDias(): number[] {
    const dias: number[] = [];
    for (let dia = 1; dia < 32; dia++) {
      dias.push(dia);
    }

    return dias;
  }

  getMeses(): number[] {
    const meses: number[] = [];
    for (let mes = 1; mes < 13; mes++) {
      meses.push(mes);
    }

    return meses;
  }

  getAnios(): number[] {
    const anios: number[] = [];
    for (let anio = 1950; anio <= new Date().getFullYear(); anio++) {
      anios.push(anio);
    }

    return anios;
  }

  getNivelEstudio(): IOpcionVo[] {
    return commonMessages.ARRAY_NIVEL_ESTUDIOS;
  }

  getEstadoNivelEstudio(): IOpcionVo[] {
    return commonMessages.ARRAY_ESTADO_NIVEL_ESTUDIO;
  }

  getNivelIdioma(): IOpcionVo[] {
    return commonMessages.ARRAY_NIVEL_IDIOMA;
  }
}

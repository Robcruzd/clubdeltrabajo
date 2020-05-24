import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_UBICACIONES } from '../constants/constantes.constants';
import { GeografiaVo } from '../vo/geografia-vo';

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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_PAISES, URL_UBICACIONES } from '../constants/constantes.constants';
import { GeografiaVo } from '../vo/geografia-vo';
import { IOpcionVo } from '../vo/opcion-vo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCiudades(): Observable<GeografiaVo[]> {
    return this.http.get<any[]>(URL_UBICACIONES);
  }

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
    const fecha = new Date();
    for (let anio = fecha.getFullYear() - 70; anio <= fecha.getFullYear(); anio++) {
      anios.push(anio);
    }

    return anios;
  }

  dataURLtoFile(data: any, filename: string): File {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    // Usage example:
    // const file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
    return new File([u8arr], filename, { type: mime });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_PAISES, URL_UBICACIONES } from '../constants/constantes.constants';
import { GeografiaVo } from '../vo/geografia-vo';
import { IOpcionVo } from '../vo/opcion-vo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly pdfFonts: any;
  pdfMake: any;
  htmlToPdfmake: any;
  region: any;

  constructor(private http: HttpClient, private regionService: RegionesService) {
    this.pdfMake = require('pdfmake/build/pdfmake.js');
    this.pdfFonts = require('pdfmake/build/vfs_fonts.js');
    this.pdfMake.vfs = this.pdfFonts.pdfMake.vfs;
    this.htmlToPdfmake = require('html-to-pdfmake');
  }

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
        element
          .map(item => {
            return {
              codigo: item.alpha2Code,
              nombre: item.translations.es ? item.translations.es : item.name
            };
          })
          .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0))
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

  downloadFile(name: any, data: any): void {
    if (name !== null && data !== null) {
      const downloadLink = document.createElement('a');
      downloadLink.href = data;
      downloadLink.download = name;
      downloadLink.click();
    }
  }
}

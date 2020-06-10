import { Archivo } from 'app/shared/model/archivo.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { HojaVidaVo } from '../vo/hoja-vida-vo';

type EntityResponseType = HttpResponse<HojaVidaVo>;
type EntityResponseTypeArchivo = HttpResponse<any>;

@Injectable({
  providedIn: 'root'
})
export class HojaVidaService {
  public resourceUrl = SERVER_API_URL + 'api/hoja-vida';

  constructor(protected http: HttpClient) {}

  create(hojaVida: HojaVidaVo): Observable<EntityResponseType> {
    return this.http.post<HojaVidaVo>(this.resourceUrl, hojaVida, { observe: 'response' });
  }

  update(hojaVida: HojaVidaVo): Observable<EntityResponseType> {
    return this.http.put<HojaVidaVo>(this.resourceUrl, hojaVida, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<HojaVidaVo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  createPDFHojaVida(archivo: Archivo): Observable<EntityResponseTypeArchivo> {
    return this.http.post<Archivo>(this.resourceUrl + '/archivo', archivo, { observe: 'response' });
  }
}

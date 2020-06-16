import { SERVER_API_URL } from './../../app.constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { InformacionEmpresaVo } from './../vo/informacion-empresa';
import { Injectable } from '@angular/core';

type EntityResponseType = HttpResponse<InformacionEmpresaVo>;

@Injectable({
  providedIn: 'root'
})
export class InformacionEmpresaService {
  public resourceUrl = SERVER_API_URL + 'api/informacion-empresa';

  constructor(protected http: HttpClient) {}

  send(informacionEmpresa: InformacionEmpresaVo): Observable<EntityResponseType> {
    return this.http.post<InformacionEmpresaVo>(this.resourceUrl, informacionEmpresa, { observe: 'response' });
  }
}

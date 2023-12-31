import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaVo } from '../../shared/vo/empresa-vo';
import { PathUtil } from '../profesion/profesion.service';

type EntityResponseType = HttpResponse<IEmpresa>;
type EntityArrayResponseType = HttpResponse<IEmpresa[]>;

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  public resourceUrl = SERVER_API_URL + 'api/empresas';
  public resourceUrlByRazon = SERVER_API_URL + 'api/empresas/getByRazon';
  public resourceUrlBySector = SERVER_API_URL + 'api/empresas/getBySector';
  public resourceUrlByClubEmpresa = SERVER_API_URL + 'api/empresas/getByClubEmpresa';
  public resourceUrlByCiudad = SERVER_API_URL + 'api/empresas/getByCiudad';

  constructor(protected http: HttpClient) {}

  crearUsuario(empresa: EmpresaVo): Observable<any> {
    return this.http.post<IEmpresa>(this.resourceUrl + '/user', empresa, { observe: 'response' });
  }

  create(empresa: IEmpresa): Observable<EntityResponseType> {
    return this.http.post<IEmpresa>(this.resourceUrl, empresa, { observe: 'response' });
  }

  update(empresa: IEmpresa | null): Observable<EntityResponseType> {
    return this.http.put<IEmpresa>(this.resourceUrl, empresa, { observe: 'response' });
  }

  find(id?: number): Observable<EntityResponseType> {
    return this.http.get<IEmpresa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmpresa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getByRazon(valor: string): Observable<any> {
    const params = PathUtil.getPathParams({ empresa: valor });
    const url = this.resourceUrlByRazon + params;
    return this.http.get<any>(url);
  }

  count(): Observable<EntityResponseType> {
    return this.http.get<IEmpresa>(`${this.resourceUrl}/count`, { observe: 'response' });
  }

  getBySector(valor: string): Observable<any> {
    const params = PathUtil.getPathParams({ sector: valor });
    const url = this.resourceUrlBySector + params;
    return this.http.get<any>(url);
  }

  getByClubEmpresa(): Observable<any> {
    const params = PathUtil.getPathParams({});
    const url = this.resourceUrlByClubEmpresa + params;
    return this.http.get<any>(url);
  }

  getByCiudad(valor: number): Observable<any> {
    const params = PathUtil.getPathParams({ ciudad: valor });
    const url = this.resourceUrlByCiudad + params;
    return this.http.get<any>(url);
  }

  verifyNit(nit: string): Observable<any> {
    const url = 'https://www.einforma.co/servlet/app/portal/ENTP/prod/LISTA_EMPRESAS/razonsocial/' + nit.slice(0, 9);
    return this.http.get<any>(url);
  }
}

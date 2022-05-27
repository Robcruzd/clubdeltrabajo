import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IBdEmpresa } from '../model/bd-empresa.model';

type EntityResponseType = HttpResponse<IBdEmpresa>;
type EntityArrayResponseType = HttpResponse<IBdEmpresa[]>;

export class PathUtil {
  public static getPathParams(parameters: any): string {
    const fields: string[] = Object.getOwnPropertyNames(parameters);
    let path = '?';
    fields.forEach((field: string, i: number) => {
      const value: any = Object.values(parameters)[i];
      if (i > 0 && path !== '?' && value !== null && value.toString().trim() !== '') {
        path += '&';
      }
      if (value !== null && value.toString().trim() !== '') {
        path += field + '=' + value;
      }
    });
    return path !== '?' ? path : '';
  }
}

@Injectable({
  providedIn: 'root'
})
export class BdEmpresaService {
  public resourceUrl = SERVER_API_URL + 'api/bd-empresa';
  public resourceUrlByIdEmpresa = SERVER_API_URL + 'api/bd-empresa/idEmpresa';
  public resourceUrlByIdUsuarioAndEmpresa = SERVER_API_URL + 'api/bd-empresa/datos';

  constructor(protected http: HttpClient) {}

  create(bdEmpresa: IBdEmpresa): Observable<EntityResponseType> {
    return this.http.post<IBdEmpresa>(this.resourceUrl, bdEmpresa, { observe: 'response' });
  }

  getBdEmpresaByIdEmpresa(ide: number): Observable<any> {
    const params = PathUtil.getPathParams({ idEmpresa: ide });
    const url = this.resourceUrlByIdEmpresa + params;
    return this.http.get<any>(url);
  }

  getBdEmpresaByIdUsuarioAndEmpresa(ide: number, ide2: number): Observable<any> {
    const params = PathUtil.getPathParams({ idUsuario: ide, idEmpresa: ide2 });
    const url = this.resourceUrlByIdUsuarioAndEmpresa + params;
    return this.http.get<any>(url);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IMembresiaEmpresa, MembresiaEmpresa } from 'app/shared/model/membresia-empresa.model';
import { Observable } from 'rxjs';

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

type EntityResponseType = HttpResponse<IMembresiaEmpresa>;
type EntityArrayResponseType = HttpResponse<IMembresiaEmpresa[]>;

@Injectable({ providedIn: 'root' })
export class MembresiaEmpresaService {
  public resourceUrl = SERVER_API_URL + 'api/membresiaEmpresa';
  public resourceUrlByPersona = SERVER_API_URL + 'api/membresiaEmpresa/filtroByEmpresa';

  constructor(protected http: HttpClient) {}

  getAllMembresiaEmpresa(): Observable<any> {
    const url = this.resourceUrl;
    return this.get(url);
  }

  public getMembresiaByEmpresa(idEmpresa?: any): Observable<MembresiaEmpresa> {
    const params = PathUtil.getPathParams({ empresa: idEmpresa });
    const url = this.resourceUrlByPersona + params;
    return this.http.get<MembresiaEmpresa>(url);
  }

  public get(url: string, headers?: any): Observable<any> {
    return this.http.get<any>(url, headers);
  }

  update(membresia: IMembresiaEmpresa | null): Observable<EntityResponseType> {
    return this.http.put<IMembresiaEmpresa>(this.resourceUrl, membresia, { observe: 'response' });
  }
}

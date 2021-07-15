import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfesion } from 'app/shared/model/profesion.model';

type EntityResponseType = HttpResponse<IProfesion>;
type EntityArrayResponseType = HttpResponse<IProfesion[]>;

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

@Injectable({ providedIn: 'root' })
export class ProfesionService {
  public resourceUrl = SERVER_API_URL + 'api/profesions';
  public resourceUrlByProfesion = SERVER_API_URL + 'api/profesions/getByProfesion';

  constructor(protected http: HttpClient) {}

  create(profesion: IProfesion): Observable<EntityResponseType> {
    return this.http.post<IProfesion>(this.resourceUrl, profesion, { observe: 'response' });
  }

  mercado(): any {
    return this.http.post<any>(SERVER_API_URL + 'api/mercadoPago', 'prueba', { observe: 'response' });
  }

  update(profesion: IProfesion): Observable<EntityResponseType> {
    return this.http.put<IProfesion>(this.resourceUrl, profesion, { observe: 'response' });
  }

  find(id?: number): Observable<EntityResponseType> {
    return this.http.get<IProfesion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfesion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  public getByProfesion(valor: string): Observable<any> {
    const params = PathUtil.getPathParams({ profesion: valor });
    const url = this.resourceUrlByProfesion + params;
    return this.http.get<any>(url);
  }
}

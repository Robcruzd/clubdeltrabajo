import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPersona } from 'app/shared/model/persona.model';
import { UsuarioVo } from '../../shared/vo/usuario-vo';

type EntityResponseType = HttpResponse<IPersona>;
type EntityArrayResponseType = HttpResponse<IPersona[]>;

export class PathUtil2 {
  public static getPathParams(parameters: any): string {
    const fields: string[] = Object.getOwnPropertyNames(parameters);
    let path = '?';
    fields.forEach((field: string, i: number) => {
      const value: any = Object.values(parameters)[i];
      if (value !== undefined && value !== null) {
        if (i > 0 && path !== '?' && value !== null) {
          path += '&';
        }
        if (value !== null) {
          path += field + '.equals=' + value;
        }
      }
    });
    return path !== '?' ? path : '';
  }
}

export class PathUtil {
  public static getPathParams(parameters: any): string {
    const fields: string[] = Object.getOwnPropertyNames(parameters);
    let path = '?';
    fields.forEach((field: string, i: number) => {
      const value: any = Object.values(parameters)[i];
      if (i > 0 && path !== '?' && value !== null) {
        path += '&';
      }
      if (value !== null) {
        path += field + '=' + value;
      }
    });
    return path !== '?' ? path : '';
  }
}

@Injectable({ providedIn: 'root' })
export class PersonaService {
  public resourceUrl = SERVER_API_URL + 'api/personas';
  public resourceUrlEnviarEmailAspirante = SERVER_API_URL + 'api/personas/enviarEmailAspirante';

  constructor(protected http: HttpClient) {}

  crearUsuario(usuario: UsuarioVo): Observable<any> {
    return this.http.post<IPersona>(SERVER_API_URL + 'api/registrar', usuario, { observe: 'response' });
  }

  create(persona: IPersona): Observable<EntityResponseType> {
    return this.http.post<IPersona>(this.resourceUrl, persona, { observe: 'response' });
  }

  update(persona: IPersona): Observable<EntityResponseType> {
    return this.http.put<IPersona>(this.resourceUrl, persona, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersona>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersona[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPersonasTotal(): Observable<EntityResponseType> {
    return this.http.get<IPersona>(`${this.resourceUrl}/${'contar'}`, { observe: 'response' });
  }

  getPersonas(): Observable<EntityResponseType> {
    return this.http.get<IPersona>(`${this.resourceUrl}/${'getPersonas'}`, { observe: 'response' });
  }

  public seleccionadoAspirante(parameters: any): Observable<any> {
    const path: string = PathUtil2.getPathParams(parameters);
    const url = this.resourceUrl + '/seleccionadoAspirante' + path;
    return this.get(url);
  }

  public get(url: string, headers?: any): Observable<any> {
    return this.http.get<any>(url, headers);
  }

  public enviarEmailAspirante(id: number, mensajeEmail: any): Observable<any> {
    const params = PathUtil.getPathParams({ persona: id, mensaje: mensajeEmail });
    const url = this.resourceUrlEnviarEmailAspirante + params;
    return this.http.get<any>(url);
  }

  count(): Observable<EntityResponseType> {
    return this.http.get<IPersona>(`${this.resourceUrl}/count`, { observe: 'response' });
  }
}

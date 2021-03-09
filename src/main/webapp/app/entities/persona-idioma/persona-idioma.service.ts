import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPersonaIdioma } from 'app/shared/model/persona-idioma.model';
import { Persona } from 'app/shared/model/persona.model';

type EntityResponseType = HttpResponse<IPersonaIdioma>;
type EntityArrayResponseType = HttpResponse<IPersonaIdioma[]>;

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
export class PersonaIdiomaService {
  public resourceUrl = SERVER_API_URL + 'api/persona-idiomas';
  public resourceUrlFiltroByPersona = SERVER_API_URL + 'api/persona-idiomas/filtroByPersona';

  constructor(protected http: HttpClient) {}

  create(personaIdioma: IPersonaIdioma): Observable<EntityResponseType> {
    return this.http.post<IPersonaIdioma>(this.resourceUrl, personaIdioma, { observe: 'response' });
  }

  update(personaIdioma: IPersonaIdioma): Observable<EntityResponseType> {
    return this.http.put<IPersonaIdioma>(this.resourceUrl, personaIdioma, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersonaIdioma>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersonaIdioma[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  public getPersonaFiltro(persona?: Persona): Observable<any> {
    const params = PathUtil.getPathParams({ persona: persona?.id });
    const url = this.resourceUrlFiltroByPersona + params;
    return this.http.get<any>(url);
  }
}

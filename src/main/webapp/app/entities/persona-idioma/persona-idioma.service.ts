import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPersonaIdioma } from 'app/shared/model/persona-idioma.model';

type EntityResponseType = HttpResponse<IPersonaIdioma>;
type EntityArrayResponseType = HttpResponse<IPersonaIdioma[]>;

@Injectable({ providedIn: 'root' })
export class PersonaIdiomaService {
  public resourceUrl = SERVER_API_URL + 'api/persona-idiomas';

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
}

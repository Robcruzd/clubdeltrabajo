import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INivelIdioma } from 'app/shared/model/nivel-idioma.model';

type EntityResponseType = HttpResponse<INivelIdioma>;
type EntityArrayResponseType = HttpResponse<INivelIdioma[]>;

@Injectable({ providedIn: 'root' })
export class NivelIdiomaService {
  public resourceUrl = SERVER_API_URL + 'api/nivel-idiomas';

  constructor(protected http: HttpClient) {}

  create(nivelIdioma: INivelIdioma): Observable<EntityResponseType> {
    return this.http.post<INivelIdioma>(this.resourceUrl, nivelIdioma, { observe: 'response' });
  }

  update(nivelIdioma: INivelIdioma): Observable<EntityResponseType> {
    return this.http.put<INivelIdioma>(this.resourceUrl, nivelIdioma, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INivelIdioma>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INivelIdioma[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

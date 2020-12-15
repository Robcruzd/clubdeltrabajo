import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRegiones } from 'app/shared/model/regiones.model';

type EntityResponseType = HttpResponse<IRegiones>;
type EntityArrayResponseType = HttpResponse<IRegiones[]>;

@Injectable({ providedIn: 'root' })
export class RegionesService {
  public resourceUrl = SERVER_API_URL + 'api/regiones';

  constructor(protected http: HttpClient) {}

  create(regiones: IRegiones): Observable<EntityResponseType> {
    return this.http.post<IRegiones>(this.resourceUrl, regiones, { observe: 'response' });
  }

  update(regiones: IRegiones): Observable<EntityResponseType> {
    return this.http.put<IRegiones>(this.resourceUrl, regiones, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegiones>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegiones[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

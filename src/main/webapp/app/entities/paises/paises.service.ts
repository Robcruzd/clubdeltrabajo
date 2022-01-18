import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaises } from 'app/shared/model/paises.model';

type EntityResponseType = HttpResponse<IPaises>;
type EntityArrayResponseType = HttpResponse<IPaises[]>;

@Injectable({ providedIn: 'root' })
export class PaisesService {
  public resourceUrl = SERVER_API_URL + 'api/paises';

  constructor(protected http: HttpClient) {}

  create(paises: IPaises): Observable<EntityResponseType> {
    return this.http.post<IPaises>(this.resourceUrl, paises, { observe: 'response' });
  }

  update(paises: IPaises): Observable<EntityResponseType> {
    return this.http.put<IPaises>(this.resourceUrl, paises, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaises>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaises[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

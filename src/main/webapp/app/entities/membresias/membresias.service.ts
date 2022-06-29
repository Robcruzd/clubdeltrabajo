import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMembresias } from 'app/shared/model/membresias.model';

type EntityResponseType = HttpResponse<IMembresias>;
type EntityArrayResponseType = HttpResponse<IMembresias[]>;

@Injectable({ providedIn: 'root' })
export class MembresiasService {
  public resourceUrl = SERVER_API_URL + 'api/membresias';

  constructor(protected http: HttpClient) {}

  create(membresias: IMembresias): Observable<EntityResponseType> {
    return this.http.post<IMembresias>(this.resourceUrl, membresias, { observe: 'response' });
  }

  update(membresias: IMembresias): Observable<EntityResponseType> {
    return this.http.put<IMembresias>(this.resourceUrl, membresias, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMembresias>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMembresias[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
